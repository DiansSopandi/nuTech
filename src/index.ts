import express, { Request, Response, NextFunction } from "express";
import { specs, swaggerUi  } from "../swagger"
import 'reflect-metadata';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./utils/dataSource";

/* Configuration */

dotEnv.config();

/** 🔥 Initialize Database */
// AppDataSource.initialize()
//   .then(() => {
//     console.log("✅ Connected to PostgreSQL database");
//   })
//   .catch((err) => {
//     console.error("❌ Error connecting to PostgreSQL database:", err);
//     process.exit(1); // Exit if DB fails
//   });

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/** Routes */
app.get('/', (req : Request,res: Response) => {
    res.send("root route");
});

const main = async () => {
        await AppDataSource.initialize()
        .then(() => {
            console.log('Connected to PostgreSQL database');
            // const port = Number(process.env.PORT) || 3007; 
            // app.listen(port, () => {
            //     console.log(`Server backend NuTech Apps running on port ${port}`);    
            // });            

            /** 🔹 Start Server */
            const port = Number(process.env.PORT) || 3000;

            if( require.main === module ){
                app.listen(port, () => {
                console.log(`🚀 Server running on port ${port}`);
                }).on("error",(err: any)=>{
                    if (err.code === "EADDRINUSE") {
                        console.error(`⚠️ Port ${port} is already in use. Choose another port.`);
                        process.exit(1);
                    } else {
                        console.error(err);
                    }    
                });
            }            

            // app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
            // app.get('/api-docs.json', (req : Request, res : Response) => {
            //     res.setHeader('Content-Type', 'application/json')
            //     res.send(specs)
            //   });
            
            app.use('/users',userRoutes);            

        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });        
}

/** Server */
main();

app.use('/api-docs',( req: Request, res: Response, next: NextFunction)=>{
    console.log("📄 Swagger Docs Requested:", req.originalUrl);
    next();    
},swaggerUi.serve,swaggerUi.setup(specs, { 
    explorer: true,
    customSiteTitle: "My API Docs",
    customfavIcon: "/favicon.ico",
    customCss: ".swagger-ui .topbar { display: none }"
  }));

app.get('/api-docs.json', (req : Request, res : Response) => {
    console.log("📄 Sending Swagger JSON");
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  });

// app.use('/users',userRoutes);

// /** 🔹 Start Server */
// const port = Number(process.env.PORT) || 3000;

// if( require.main === module ){
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     }).on("error",(err: any)=>{
//         if (err.code === "EADDRINUSE") {
//             console.error(`⚠️ Port ${port} is already in use. Choose another port.`);
//             process.exit(1);
//           } else {
//             console.error(err);
//           }    
//     });
// }

export default app;