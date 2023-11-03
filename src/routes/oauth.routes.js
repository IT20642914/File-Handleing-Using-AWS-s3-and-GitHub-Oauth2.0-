import express from "express";
const router = express.Router();
import {oauthRequest,homeLogin,oauthCallback} from '../controller/oauth.controller.js'


router.get("/",homeLogin );
router.get("/oauth-Request",oauthRequest );
router.get("/oauth-callback",oauthCallback );


export default router;

