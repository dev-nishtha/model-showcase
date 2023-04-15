import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import UPLOADS_PATH  from '../utils/createUploadsFolder';
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, UPLOADS_PATH);
    },
    filename: function (_req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, uuidv4() + extension);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (_req, file, cb) {
      const allowedExtensions = ['.glb', '.gltf', '.fbx'];
      const extension = path.extname(file.originalname);
      if (allowedExtensions.includes(extension)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
       
      }
    },
  })
  const fileValidation = (req: Request, res: Response, next: NextFunction) => {
    upload.single('file_path')(req, res, function (err: any) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        next();
      }
    });
  };
    
export default fileValidation;
  