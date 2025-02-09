"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInitMiddleware = void 0;
const dataSource_1 = require("../utils/dataSource");
/** Middleware to initialize the database before handling routes */
const dbInitMiddleware = async (req, res, next) => {
    try {
        console.log("✅ AppDataSource pre-initialized... (Middleware)");
        if (!dataSource_1.AppDataSource.isInitialized) {
            console.log("✅ Database pre-connected... (Middleware)");
            await dataSource_1.AppDataSource.initialize();
            console.log("✅ Database connected successfully (Middleware)");
        }
        console.log("✅ PG already connected... (Middleware)");
        next(); // Proceed to the next route
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        res.status(500).json({ success: false, message: `Database connection failed ${error}` });
    }
};
exports.dbInitMiddleware = dbInitMiddleware;
//# sourceMappingURL=dbMiddleware.js.map