import { Request, Response, NextFunction } from 'express';
import { showcaseFile } from '../queries/showcaseFile'
import  fs from 'fs';

export const getModel=async (_req:Request, res:Response, _next:NextFunction) => {
    try {
        const lastFileMetadata = await showcaseFile()
        const lastFile = fs.readFileSync(lastFileMetadata.file_path);
        const base64String = lastFile.toString('base64');
    
        return res.status(200).json({
          data: {
            title: lastFileMetadata.title,
            description: lastFileMetadata.description,
            fileData: base64String,
          },
        });
     
      
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
  }