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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataSource_1 = require("../utils/dataSource");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const user_schema_1 = require("../schemas/user.schema");
// const userRoutes = (client: any) => {
const router = (0, express_1.Router)();
/**
 * @openapi
 * '/users/register':
 *  post:
 *     tags:
 *     - Users Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *            properties:
 *              firstname:
 *                type: string
 *                default: guardians
 *              lastname:
 *                type: string
 *                default: asguard
 *              email:
 *                type: string
 *                default: guardians.asguard@mail.com
 *              password:
 *                type: string
 *                default: Pass123!@
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/register', (0, validate_1.validate)(user_schema_1.registerSchema), user_controller_1.UserController.register);
/**
 * @openapi
 * '/users/login':
 *  post:
 *     tags:
 *     - Users Controller
 *     summary: Authencicate a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: guardians.asguard@mail.com
 *              password:
 *                type: string
 *                default: Pass123!@
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/login', (0, validate_1.validate)(user_schema_1.loginSchema), user_controller_1.UserController.login);
/**
 * @openapi
 * /users/:
 *  get:
 *    summary: Returns list of users
 *    tags:
 *      - Users Controller
 *    responses:
 *      200:
 *       description: profile user
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             success:
 *              type: boolean
 *             message:
 *              type: string
 *             data:
 *              type: object
 *             nullable: true
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dataSource_1.AppDataSource.query("SELECT * FROM users");
        res.json({
            success: true,
            message: "Fetched all users",
            data: result,
        });
    }
    catch (err) {
        console.error("Error executing query", err);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
}));
/**
 * @openapi
 * /users/profile:
 *  get:
 *    summary: Returns profile of user.
 *    tags:
 *      - Users Controller
 *    responses:
 *      200:
 *       description: profile user
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             success:
 *              type: boolean
 *             message:
 *              type: string
 *             data:
 *              type: object
 *             nullable: true
 */
router.get("/profile", user_controller_1.UserController.profile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map