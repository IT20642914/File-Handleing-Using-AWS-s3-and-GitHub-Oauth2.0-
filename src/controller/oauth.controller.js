import axios from 'axios';
import { response } from 'express';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export const oauthRequest = async (req, res) => {
  const filePath = path.join(__dirname, '../static', 'index.html');
  res.sendFile(filePath);
};

