import express from 'express';
import { getModel } from '../controllers/showcaseController';

const router = express.Router();

router.get('/',getModel );

export default router ;
