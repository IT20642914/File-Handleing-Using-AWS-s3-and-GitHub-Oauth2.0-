import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import awsRoutes from "./routes/aws.routes.js";
const app= express();
const PORT= process.env.prot||"9090";

const corsConfig = {
    credentials: true,
    origin: true,
};
dotenv.config();
app.use(cors(corsConfig));
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());


app.use("/aws", awsRoutes);
app.listen(PORT, ()=> console.log(`Listing on port  ${PORT}` ))