"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../utils/dataSource");
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Ensure database is connected first
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Connected to PostgreSQL database');
    // Mount the user routes here (similar to your existing logic)
    app.use('/api/users', user_routes_1.default);
    // Route handler for /users
    app.get('/', user_routes_1.default);
})
    .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL database:', err);
    process.exit(1);
});
// Vercel expects the handler to be exported
exports.default = app;
//# sourceMappingURL=users.js.map