import express from "express";
import { specs, swaggerUi  } from "../swagger"
import 'reflect-metadata';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import dotEnv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.";
import { AppDataSource } from "./utils/dataSource";

/* Configuration */

// dotEnv.config();

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/** Routes */
app.get('/', (req,res) => {
    res.send("root route");
});


const main = async () => {
        await AppDataSource.initialize()
        .then(() => {
            console.log('Connected to PostgreSQL database');
            const port = Number(process.env.PORT) || 3007; 
            app.listen(port, () => {
                console.log(`Server backend NuTech Apps running on port ${port}`);    
            });            

            app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
            app.get('/api-docs.json', (req, res) => {
                res.setHeader('Content-Type', 'application/json')
                res.send(specs)
              });
            
            app.use('/users',userRoutes);
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });        
}

/** Server */
main();

