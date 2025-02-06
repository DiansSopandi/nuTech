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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_entity_1 = require("../entities/user.entity");
const utils_1 = require("../utils");
class UserService {
    static create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload.password) {
                throw new Error("Password is required");
            }
            // const create = this.userRepository.create(payload);
            // return this.userRepository.save(create);
            const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
            payload.password = hashedPassword;
            return yield utils_1.AppDataSource.query(`INSERT INTO users (firstname, lastname, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`, [payload.firstname, payload.lastname, payload.email, payload.password]);
        });
    }
    static findByEmail(email) {
        return this.userRepository
            .query("SELECT * FROM users WHERE email = $1", [email])
            .then((res) => (res === null || res === void 0 ? void 0 : res.length) > 0 ? res[0] : null);
    }
    static signTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = (0, utils_1.signJwt)({ sub: user.email, id: user.id }, "accessTokenPrivateKey", {
                expiresIn: `${(0, utils_1.getConfig)("accessTokenExpiresIn")}m`,
            });
            const refresh_token = (0, utils_1.signJwt)({ sub: user.email, id: user.id }, "refreshTokenPrivateKey", {
                expiresIn: `${(0, utils_1.getConfig)("refreshTokenExpiresIn")}m`,
            });
            return { access_token, refresh_token };
        });
    }
}
exports.UserService = UserService;
UserService.userRepository = utils_1.AppDataSource.getRepository(user_entity_1.User);
//# sourceMappingURL=UserService.js.map