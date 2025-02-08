import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../utils/dataSource";

/** Middleware to initialize the database before handling routes */
export const dbInitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!AppDataSource.isInitialized) {
            console.log("✅ Database pre-connected (Middleware)");
            await AppDataSource.initialize();
            console.log("✅ Database connected successfully (Middleware)");
        }
        next(); // Proceed to the next route
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
};
