import app from './server'
import pool from './config/db';
import uploadRouter from './routes/uploadRoute';
import showcaseRouter from './routes/showcaseRoute';
import {createFileTable} from './queries/createFilesTable'
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

//define your routes here
app.use('/api/upload',uploadRouter)
app.use('/api/showcase',showcaseRouter)

 pool
  .connect()
  .then(() => {
   console.log(`Database connected successfully`)
    app.listen(port, async () => {
      await createFileTable()
      console.log(`Server running on http://localhost:${port}/`);
    });
  })
  .catch((err) => console.error('Error connecting to pool', err));
