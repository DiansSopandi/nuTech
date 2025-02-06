"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const signJwt = (payload, keyName, options) => {
    const privateKey = Buffer.from((0, config_1.getConfig)(keyName), 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { issuer: 'nuTech', algorithm: 'HS256' }));
};
exports.signJwt = signJwt;
