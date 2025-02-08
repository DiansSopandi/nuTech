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
exports.dbInitMiddleware = void 0;
const dataSource_1 = require("../utils/dataSource");
/** Middleware to initialize the database before handling routes */
const dbInitMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!dataSource_1.AppDataSource.isInitialized) {
            console.log("✅ Database pre-connected (Middleware)");
            yield dataSource_1.AppDataSource.initialize();
            console.log("✅ Database connected successfully (Middleware)");
        }
        next(); // Proceed to the next route
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});
exports.dbInitMiddleware = dbInitMiddleware;
//# sourceMappingURL=dbMiddleware.js.map