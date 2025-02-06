"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
const config_1 = __importDefault(require("config"));
function getConfig(setting) {
    return config_1.default.get(setting);
}
//# sourceMappingURL=config.js.map