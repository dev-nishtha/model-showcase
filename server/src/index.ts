import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

pool
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
    });
  })
  .catch((err) => console.error('Error connecting to pool', err));
