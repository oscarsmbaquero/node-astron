import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import {  getItems } from '../controllers/items.controller.js';

 const itemsRoutes = express.Router();

  itemsRoutes.get('/', getItems);
//  userRoutes.post('/',registerUser);
//  userRoutes.post('/login/',loginUser);



export { itemsRoutes };