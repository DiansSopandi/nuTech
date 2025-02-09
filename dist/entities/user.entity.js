"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const base_entity_1 = __importDefault(require("./base.entity"));
let User = class User extends base_entity_1.default {
    email;
    password;
    firstname;
    lastname;
    _isPasswordModified = false;
    async hashPassword(next) {
        // if (this._isPasswordModified ) return next();
        if (!this._isPasswordModified) {
            const salt = await bcryptjs_1.default.genSalt(12);
            this.password = await bcryptjs_1.default.hash(this.password, salt);
            this._isPasswordModified = true;
            // next();
        }
    }
    //     setPassword(value: string) {
    //       this._isPasswordModified = true;
    //       this.password = value;
    //     }    
    //     getPassword(): string {
    //       return this.password;
    //   }    
    static async comparePasswords(candidatePassword, hashedPassword) {
        return await bcryptjs_1.default.compare(candidatePassword, hashedPassword);
    }
    static createVerificationCode() {
        const verificationCode = crypto_1.default.randomBytes(32).toString('hex');
        const hashedVerificationCode = crypto_1.default
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex');
        return { verificationCode, hashedVerificationCode };
    }
    toJSON() {
        return { ...this, password: undefined, verificationCode: undefined };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map