import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../utils/dataSource";
import { UserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/user.schema";

// const userRoutes = (client: any) => {
const router = Router();

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
router.post('/register', validate(registerSchema), UserController.register);

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
router.post('/login', validate(loginSchema), UserController.login);

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
router.get("/", async (req : Request, res : Response) => {
  try {
    const result = await AppDataSource.query("SELECT * FROM users");

    res.json({
      success: true,
      message: "Fetched all users",
      data: result,
    });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

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
router.get("/profile", UserController.profile );

export default router;
