import { Request, Response, NextFunction } from 'express';
import { uploadFile } from './../queries/uploadFile';
import fs from 'fs';


export const handleFileUpload = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        // Get file metadata from the request body
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded',
            });
        }
        // Get the uploaded file path
        const file_path = req.file.path;
  
        // Save the file metadata to the database
        const result = await uploadFile(title, description, file_path);
        return res.status(200).json({
            message: 'File uploaded successfully',
            data: result,
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
            message: 'Error uploading file',
        });
        
    }
}
