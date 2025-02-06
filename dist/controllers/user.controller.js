"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../services/UserService");
const user_entity_1 = require("../entities/user.entity");
const utils_1 = require("../utils");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { firstname, lastname, email, password } = req.body;
                if (!firstname || !lastname || !email || !password) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid parameters",
                    });
                }
                const isExist = yield UserService_1.UserService.findByEmail(email);
                if (!(isExist === null || isExist === void 0 ? void 0 : isExist.email)) {
                    const payload = { firstname, lastname, email, password };
                    yield UserService_1.UserService.create(payload);
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
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const { email, password } = req.body;
                const user = yield UserService_1.UserService.findByEmail(email);
                const isMatched = yield user_entity_1.User.comparePasswords(password, (_b = user === null || user === void 0 ? void 0 : user.password) !== null && _b !== void 0 ? _b : "");
                if (!user || !isMatched) {
                    return res.status(400).json({
                        success: false,
                        message: !user ? "Invalid email" : "Invalid password",
                        data: null,
                    });
                }
                const { access_token, refresh_token } = yield UserService_1.UserService.signTokens(user);
                res.cookie("access_token", access_token, _a.accessTokenCookieOptions);
                res.cookie("refresh_token", refresh_token, _a.refreshTokenCookieOptions);
                res.cookie("logged_in", true, Object.assign(Object.assign({}, _a.accessTokenCookieOptions), { httpOnly: false }));
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
        });
    }
    static profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.access_token;
                if (!token) {
                    return res.status(401).json({
                        success: false,
                        message: "No access token provided. Please log in.",
                        data: null,
                    });
                }
                const decoded = (yield jsonwebtoken_1.default.verify(token, Buffer.from((0, utils_1.getConfig)("accessTokenPrivateKey"), "base64").toString("ascii")));
                const user = yield UserService_1.UserService.findByEmail(decoded.sub);
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
        });
    }
}
exports.UserController = UserController;
_a = UserController;
UserController.cookiesOptions = Object.assign({ httpOnly: true, sameSite: "lax" }, (process.env.NODE_ENV === "production" && {
    secure: true,
}));
UserController.accessTokenCookieOptions = Object.assign(Object.assign({}, _a.cookiesOptions), { expires: new Date(Date.now() + (0, utils_1.getConfig)("accessTokenExpiresIn") * 60 * 1000), maxAge: (0, utils_1.getConfig)("accessTokenExpiresIn") * 60 * 1000 });
UserController.refreshTokenCookieOptions = Object.assign(Object.assign({}, _a.cookiesOptions), { expires: new Date(Date.now() + (0, utils_1.getConfig)("refreshTokenExpiresIn") * 60 * 1000), maxAge: (0, utils_1.getConfig)("refreshTokenExpiresIn") * 60 * 1000 });
//# sourceMappingURL=user.controller.js.map