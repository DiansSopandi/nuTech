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
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("❌ Error connecting to PostgreSQL database:", err);
    process.exit(1); // Exit if DB fails
  });

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

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
app.get('/api-docs.json', (req : Request, res : Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  });

app.use('/users',userRoutes);

// const main = async () => {
//         await AppDataSource.initialize()
//         .then(() => {
//             console.log('Connected to PostgreSQL database');
//             const port = Number(process.env.PORT) || 3007; 
//             app.listen(port, () => {
//                 console.log(`Server backend NuTech Apps running on port ${port}`);    
//             });            

//             app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
//             app.get('/api-docs.json', (req : Request, res : Response) => {
//                 res.setHeader('Content-Type', 'application/json')
//                 res.send(specs)
//               });
            
//             app.use('/users',userRoutes);            

//         })
//         .catch((err) => {
//             console.error('Error connecting to PostgreSQL database', err);
//         });        
// }

/** Server */
// main();

/** 🔹 Start Server */
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app;