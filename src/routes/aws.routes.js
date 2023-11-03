import express from "express";
const router = express.Router();
import multer from 'multer'; 
import {sampleRequest,downloadFileFromS3,UploadFile} from '../controller/aws.controller.js'
const storage = multer.diskStorage({
    destination: 'temp/', // Destination folder for uploaded files
    // limits: { fileSize: 8 * 1024 * 1024 }, // File size limit
  });
const upload = multer({ storage: storage });
router.get("/getsamplerequets",sampleRequest );
router.post("/UploadFile", upload.single('file'), UploadFile);
router.get("/downloadFile",downloadFileFromS3 );
export default router;