import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";
import { User } from "../entities/user.entity";
import { getConfig } from "../utils";
import { TokenPayload } from "../types";

export class UserController {
  private static readonly cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    ...(process.env.NODE_ENV === "production" && {
      secure: true,
    }),
  };

  private static readonly accessTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + getConfig<number>("accessTokenExpiresIn") * 60 * 1000
    ),
    maxAge: getConfig<number>("accessTokenExpiresIn") * 60 * 1000,
  };

  private static readonly refreshTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + getConfig<number>("refreshTokenExpiresIn") * 60 * 1000
    ),
    maxAge: getConfig<number>("refreshTokenExpiresIn") * 60 * 1000,
  };

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
          status: false,
          message: "Invalid parameters",
        });
      }

      const isExist = await UserService.findByEmail(email);

      if (!isExist?.email) {
        const payload = { firstname, lastname, email, password };
        await UserService.create(payload);

        return res.status(201).json({
          status: true,
          message: "Registrasi berhasil silahkan login",
          data: null,
        });
      } else {
        return res.status(422).json({
          status: false,
          message: `email ${email} already exist`,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);

      const isMatched = await User.comparePasswords(
        password,
        user?.password ?? ""
      );

      if (!user || !isMatched) {
        return res.status(400).json({
          success: false,
          message: !user ? "Invalid email" : "Invalid password",
          data: null,
        });
      }

      const { access_token, refresh_token } = await UserService.signTokens(
        user
      );

      res.cookie(
        "access_token",
        access_token,
        UserController.accessTokenCookieOptions
      );

      res.cookie(
        "refresh_token",
        refresh_token,
        UserController.refreshTokenCookieOptions
      );

      res.cookie("logged_in", true, {
        ...UserController.accessTokenCookieOptions,
        httpOnly: false,
      });

      res.status(200).json({
        success: true,
        message: "login success",
        data: {
          token: access_token,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  public static async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.access_token;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No access token provided. Please log in.",
          data: null,
        });
      }

      const decoded = (await jwt.verify(
        token,
        Buffer.from(
          getConfig<string>("accessTokenPrivateKey"),
          "base64"
        ).toString("ascii")
      )) as TokenPayload;
      const user = await UserService.findByEmail(decoded.sub);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user not found",
          data: null,
        });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "You have signed-in succesfully",
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        });
    } catch (err: any) {
      next(err);
    }
  }
}
