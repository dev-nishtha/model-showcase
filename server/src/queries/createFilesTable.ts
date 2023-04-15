import pool from '../config/db';
export const createFileTable = async ():Promise<void> => {
    const query = {
        text: 'CREATE TABLE IF NOT EXISTS files(id SERIAL PRIMARY KEY,title TEXT NOT NULL,description TEXT,file_path TEXT NOT NULL,created_at TIMESTAMP DEFAULT NOW(),updated_at TIMESTAMP DEFAULT NOW())',
    };
    try {
        await pool.query(query);
        console.log('Created table `FILES`');
    } catch (err) {
        console.log('Error creating table', err);
    }

}