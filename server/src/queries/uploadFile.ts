import pool from '../config/db';

export const uploadFile = async (title: string, description: string, file_path: string) => {
    const query =
    {
        text: 'INSERT INTO files(title, description, file_path) VALUES($1, $2, $3) RETURNING *',
        values: [ title, description, file_path ]
    };
    
    try {
        const { rows } = await pool.query(query);
        return rows[ 0 ];
        
    } catch (err) {
        console.log('Error adding data to database', err);
    };
};