"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.verifyEmailSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// import { RoleUser } from '../entities';
exports.registerSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstname: (0, zod_1.string)({
            required_error: 'Firstname is required',
        }),
        lastname: (0, zod_1.string)({
            required_error: 'Lastname is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(30, 'Password must be less than 30 characters')
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{8,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'),
        //   passwordConfirm: string({
        //      required_error: 'Please confirm your password',
        //   }),
        //   role: z.optional(z.nativeEnum(RoleUser)),
    }),
    //    .refine(data => data.password === data.passwordConfirm, {
    //       path: ['passwordConfirm'],
    //       message: 'Password do not match',
    //    }),
});
exports.verifyEmailSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(8, 'Password must be more than 8 characters'),
    }),
});
