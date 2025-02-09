"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../services/UserService");
const user_entity_1 = require("../entities/user.entity");
const utils_1 = require("../utils");
class UserController {
    static cookiesOptions = {
        httpOnly: true,
        sameSite: "lax",
        ...(process.env.NODE_ENV === "production" && {
            secure: true,
        }),
    };
    static accessTokenCookieOptions = {
        ...this.cookiesOptions,
        expires: new Date(Date.now() + (0, utils_1.getConfig)("accessTokenExpiresIn") * 60 * 1000),
        maxAge: (0, utils_1.getConfig)("accessTokenExpiresIn") * 60 * 1000,
    };
    static refreshTokenCookieOptions = {
        ...this.cookiesOptions,
        expires: new Date(Date.now() + (0, utils_1.getConfig)("refreshTokenExpiresIn") * 60 * 1000),
        maxAge: (0, utils_1.getConfig)("refreshTokenExpiresIn") * 60 * 1000,
    };
    static async register(req, res, next) {
        try {
            let { firstname, lastname, email, password } = req.body;
            if (!firstname || !lastname || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid parameters",
                });
            }
            const isExist = await UserService_1.UserService.findByEmail(email);
            if (!isExist?.email) {
                const payload = { firstname, lastname, email, password };
                await UserService_1.UserService.create(payload);
                return res.status(201).json({
                    status: true,
                    message: "Registrasi berhasil silahkan login",
                    data: null,
                });
            }
            else {
                return res.status(422).json({
                    status: false,
                    message: `email ${email} already exist`,
                    data: null,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserService_1.UserService.findByEmail(email);
            const isMatched = await user_entity_1.User.comparePasswords(password, user?.password ?? "");
            if (!user || !isMatched) {
                return res.status(400).json({
                    success: false,
                    message: !user ? "Invalid email" : "Invalid password",
                    data: null,
                });
            }
            const { access_token, refresh_token } = await UserService_1.UserService.signTokens(user);
            res.cookie("access_token", access_token, UserController.accessTokenCookieOptions);
            res.cookie("refresh_token", refresh_token, UserController.refreshTokenCookieOptions);
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
        }
        catch (err) {
            next(err);
        }
    }
    static async profile(req, res, next) {
        try {
            const token = req.cookies?.access_token;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "No access token provided. Please log in.",
                    data: null,
                });
            }
            const decoded = (await jsonwebtoken_1.default.verify(token, Buffer.from((0, utils_1.getConfig)("accessTokenPrivateKey"), "base64").toString("ascii")));
            const user = await UserService_1.UserService.findByEmail(decoded.sub);
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
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map