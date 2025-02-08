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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("../swagger");
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const dataSource_1 = require("../utils/dataSource");
const dbMiddleware_1 = require("../middlewares/dbMiddleware");
/* Configuration */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
/** 🔥 Initialize Database Before Handling Requests */
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!dataSource_1.AppDataSource.isInitialized) {
            yield dataSource_1.AppDataSource.initialize();
            console.log("✅ Database connected successfully");
        }
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Stop the server if DB fails
    }
});
/** Middleware to Ensure Database is Initialized */
// app.use(async (req: Request, res: Response, next: NextFunction) => {
//     await initializeDatabase();
//     next();
// });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dataSource_1.AppDataSource.initialize()
            .then(() => {
            console.log('Connected to PostgreSQL database on main function');
            // const port = Number(process.env.PORT) || 3007; 
            // app.listen(port, () => {
            //     console.log(`Server backend NuTech Apps running on port ${port}`);    
            // });            
            /** 🔹 Start Server */
            const port = Number(process.env.PORT) || 3000;
            if (require.main === module) {
                app.listen(port, () => {
                    console.log(`🚀 Server running on port ${port}`);
                }).on("error", (err) => {
                    if (err.code === "EADDRINUSE") {
                        console.error(`⚠️ Port ${port} is already in use. Choose another port.`);
                        process.exit(1);
                    }
                    else {
                        console.error(err);
                    }
                });
            }
            // app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
            // app.get('/api-docs.json', (req : Request, res : Response) => {
            //     res.setHeader('Content-Type', 'application/json')
            //     res.send(specs)
            //   });
            // app.use('/users',userRoutes);            
        })
            .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL database', error);
    }
});
/** Server */
// main();
/** Routes */
// app.get('/', (req : Request,res: Response) => {
// res.send("initialize root");
// res.redirect("/api-docs");
// });
// app.use('/users',dbInitMiddleware,  userRoutes);
// app.get('/', dbInitMiddleware, userRoutes);
// app.use('/',swaggerUi.serve,swaggerUi.setup(specs));
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
// app.use('/api-docs',( req: Request, res: Response, next: NextFunction)=>{
//     console.log("📄 Swagger Docs Requested:", req.originalUrl);
//     next();    
// },swaggerUi.serve,swaggerUi.setup(specs, { 
//     explorer: true,
//     customSiteTitle: "My API Docs",
//     customfavIcon: "/favicon.ico",
//     customCss: ".swagger-ui .topbar { display: none }"
//   }));
// app.get('/api-docs.json', (req : Request, res : Response) => {
//    res.setHeader('Content-Type', 'application/json')
//    res.send(specs)
// });
// app.get('/api-docs.json', (req : Request, res : Response) => {
//     console.log("📄 Sending Swagger JSON");
//     res.setHeader('Content-Type', 'application/json')
//     res.send(specs)
//   });
// /** 🔹 Start Server */
const port = Number(process.env.PORT) || 3000;
if (require.main === module) {
    initializeDatabase();
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    }).on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`⚠️ Port ${port} is already in use. Choose another port.`);
            process.exit(1);
        }
        else {
            console.error(err);
        }
    });
}
app.use('/users', dbMiddleware_1.dbInitMiddleware, user_routes_1.default);
// app.use('/',swaggerUi.serve,swaggerUi.setup(specs));
app.use('/', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs, {
    explorer: true,
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
}));
app.get("/api-docs/", (req, res) => {
    res.redirect("/");
});
// app.use(
//     "/swagger-assets",
//     express.static(path.join(__dirname, "node_modules", "swagger-ui-dist"))
//   );
// app.use('/',swaggerUi.serve,swaggerUi.setup(specs,{
//     customCssUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css",
//   }));
// app.use('/',swaggerUi.serve,swaggerUi.setup(specs,{
//     customCssUrl: "/swagger-assets/swagger-ui.css",
//     customJs: ["/swagger-assets/swagger-ui-bundle.js", "/swagger-assets/swagger-ui-standalone-preset.js"],
//   }));
/** Serve Swagger UI assets explicitly */
// app.use(
//     "/api-docs",
//     express.static(path.join(__dirname, "..", "node_modules", "swagger-ui-dist"))
//   );  
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.specs);
});
// export default app;
exports.default = (req, res) => {
    app(req, res);
};
//# sourceMappingURL=index.js.map