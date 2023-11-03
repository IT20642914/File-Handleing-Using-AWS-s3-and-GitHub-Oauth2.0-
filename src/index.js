import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import awsRoutes from "./routes/aws.routes.js";
import oauthRoutes from "./routes/oauth.routes.js";
const app = express();
const PORT = process.env.PORT || 9090; // Correct the typo in "process.env.PORT"

const corsConfig = {
    credentials: true,
    origin: true,
};

dotenv.config();
app.use(cors(corsConfig));
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
// Serve static files using express.static
app.use(express.static(path.join(__dirname, 'static')));


app.use("/oauth", oauthRoutes);
app.use("/aws", awsRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
