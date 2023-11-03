import express from "express";
const router = express.Router();
import {oauthRequest,homeLogin} from '../controller/oauth.controller.js'


router.get("/",oauthRequest );


export default router;

