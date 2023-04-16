import { Request, Response, NextFunction } from 'express';
import { showcaseFile } from '../queries/showcaseFile'
export const getModel=async (_req:Request, res:Response, _next:NextFunction) => {
    try {
        const lastFileMetadata = await showcaseFile()
    
        return res.status(200).json({
          data: {
            title: lastFileMetadata.title,
            description: lastFileMetadata.description,
            file_path: lastFileMetadata.file_path,
          },
        });
     
      
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
  }