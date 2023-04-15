import express from 'express';
import fileValidation from '../middlewares/fileValidation'
import {handleFileUpload } from '../controllers/uploadController'

const router = express.Router();


router.post('/', fileValidation, handleFileUpload );

export default router;
