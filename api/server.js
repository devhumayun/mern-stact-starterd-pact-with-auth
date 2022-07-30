import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors';
import StudentsRoute from './route/studentsRoute.js'
import userRoute from './route/userRoute.js'
import { connectMongoDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';


// express init
const app = express();

// dotenv config
dotenv.config();

// Middle ware init
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());

// environment variable init
const PORT = process.env.SERVER_PORT;

// student server
app.use('/api/students', StudentsRoute);
// users server
app.use('/api/user', userRoute );



// custom error
app.use(errorHandler)

// server listener
app.listen( PORT, () =>  {
    connectMongoDB();
    console.log(`SERVER is runing on PORT : ${ PORT }`.bgGreen.black);
})

