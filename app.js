import express from "express";
import dotenv from "dotenv";  
import helmet from "helmet";  
import dbConnection from "./config/server.js"; 
import globalError from "./middlewares/errorMiddleware.js";
import ApiError from "./utils/ApiError.js";
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config({path: "./config.env"});

//Express app
const app = express();

//Connect database 
dbConnection();

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

//mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.all(/.*/, (req, res, nxt)=>{
    nxt(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection Errors: ${err}`);
    server.close(() =>{
        process.exit(1);
    });
});
