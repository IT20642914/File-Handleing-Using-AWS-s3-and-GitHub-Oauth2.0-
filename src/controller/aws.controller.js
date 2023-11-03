import axios from 'axios';
import { response } from 'express';
import dotenv from "dotenv";
import {  S3Client,PutObjectCommand,GetObjectCommand   } from '@aws-sdk/client-s3';

import { createReadStream } from 'fs';
dotenv.config();



 export  const downloadFileFromS3 = async (req, res) => {
    try {
      const s3Client = new S3Client({ region: 'ap-southeast-1' });
      const { fileName } = req.query; // Get the filename to download from the query string
   

      const downloadParams = {
        Bucket: 'textract-console-ap-southeast-1-3a607a41-b9f8-4e5f-b3b2-8ed03ff',
        Key:'Porcore/'+ fileName, // Use the filename as the object key
      };
  
      const getObjectCommand = new GetObjectCommand(downloadParams);
  
      const { Body, ContentType } = await s3Client.send(getObjectCommand);
  
      // Set response headers to indicate file download
      res.set({
        'Content-Type': ContentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      });
  
      // Pipe the S3 object's Body to the response
      Body.pipe(res);
    } catch (error) {
      console.error('Error downloading file from S3:', error);
      res.status(500).json({ message: 'Error downloading file from S3', error: error.message });
    }
  };
  
  export default downloadFileFromS3;

  export const UploadFile = async (req, res) => {
    try {
      const s3Client = new S3Client({ region: 'ap-southeast-1' });
      const formData = req.file;
     
      if (!formData) {
        res.status(400).send('No file to uploaded.');
        return;
      }
      const { originalname, filename } = req.file;
   

      const params = {
        Bucket: 'textract-console-ap-southeast-1-3a607a41-b9f8-4e5f-b3b2-8ed03ff',
        Key: 'Porcore/' + originalname,
        Body: createReadStream(`temp/${filename}`), // Use fileStream directly
      };
  
      const uploadCommand = new PutObjectCommand(params);
      const uploadResponse = await s3Client.send(uploadCommand);
  
      console.log(`File uploaded to S3: ${uploadResponse.ETag}`);
      res.send('File uploaded to S3');
    } catch (error) {
      console.error('Error uploading the file to S3:', error);
      res.status(500).send('Error uploading the file to S3');
    }
  };
  
  
  
  
  
  