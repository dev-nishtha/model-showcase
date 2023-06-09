import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

export default app;
