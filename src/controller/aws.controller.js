import axios from 'axios';
import { response } from 'express';
import dotenv from "dotenv";
import {  S3Client,PutObjectCommand,GetObjectCommand   } from '@aws-sdk/client-s3';
import multer from 'multer';
import { createReadStream } from 'fs';
dotenv.config();
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
export const sampleRequest = async (req, res) => {
    try {
      const body=  {
        body: {
            grant_type: 'authorization_code',
            client_id: 'db0d63cfa7ac3ceed7166081542216ec99e12341300e5e879105e36bd76dbf63',
            client_secret: '0b57e8d87e35370307ba5f98ad456bd155cabacea56d49994afe083e2eb04b54',
            code: '8957b84a67f6ae55ab79c9767836a0af30b7fb7e4c36b27434993123cce71ec7',
            redirect_uri: 'http://localhost',
            refresh_token: 'string'
          },
          }
      const response = await axios.post('https://login.procore.com/oauth/token',body);
  
      const access_token = response.data.access_token;
      console.log('Access Token:', access_token);
      res.status(200).send(access_token);
    } catch (error) {
      console.error('Error:', error);
      res.status(401).send(error.message);
    }
  };



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
        res.status(400).send('No file uploaded.');
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
  
  
  
  
  
  