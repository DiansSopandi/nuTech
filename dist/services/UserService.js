"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_entity_1 = require("../entities/user.entity");
const utils_1 = require("../utils");
class UserService {
    static async create(payload) {
        if (!payload.password) {
            throw new Error("Password is required");
        }
        // const create = this.userRepository.create(payload);
        // return this.userRepository.save(create);
        const hashedPassword = await bcryptjs_1.default.hash(payload.password, 10);
        payload.password = hashedPassword;
        return await utils_1.AppDataSource.query(`INSERT INTO users (firstname, lastname, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`, [payload.firstname, payload.lastname, payload.email, payload.password]);
    }
    static findByEmail(email) {
        return this.userRepository
            .query("SELECT * FROM users WHERE email = $1", [email])
            .then((res) => res?.length > 0 ? res[0] : null);
    }
    static async signTokens(user) {
        const access_token = (0, utils_1.signJwt)({ sub: user.email, id: user.id }, "accessTokenPrivateKey", {
            expiresIn: `${(0, utils_1.getConfig)("accessTokenExpiresIn")}m`,
        });
        const refresh_token = (0, utils_1.signJwt)({ sub: user.email, id: user.id }, "refreshTokenPrivateKey", {
            expiresIn: `${(0, utils_1.getConfig)("refreshTokenExpiresIn")}m`,
        });
        return { access_token, refresh_token };
    }
}
exports.UserService = UserService;
UserService.userRepository = utils_1.AppDataSource.getRepository(user_entity_1.User);
//# sourceMappingURL=UserService.js.map