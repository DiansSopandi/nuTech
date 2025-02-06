"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInitMiddleware = void 0;
const dataSource_1 = require("../utils/dataSource");
/** Middleware to initialize the database before handling routes */
const dbInitMiddleware = async (req, res, next) => {
    try {
        if (!dataSource_1.AppDataSource.isInitialized) {
            await dataSource_1.AppDataSource.initialize();
            console.log("✅ Database connected successfully (Middleware)");
        }
        next(); // Proceed to the next route
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
};
exports.dbInitMiddleware = dbInitMiddleware;
//# sourceMappingURL=dbMiddleware.js.map