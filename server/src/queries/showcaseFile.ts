import {  QueryResultRow } from 'pg';
import pool from '../config/db';

export const showcaseFile = async (): Promise<QueryResultRow> => {
  const query = {
    text: 'SELECT * FROM files ORDER BY id DESC LIMIT 1',
  };

  try {
    const { rows } = await pool.query(query);
    return rows[ 0 ];
    
} catch (err) {
    console.log('Error fetching file from the database', err);
    throw err;
};
};
