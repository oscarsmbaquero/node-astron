import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//import { registerUser, getUsers, loginUser } from '../controllers/user.controller.js';

 const itemsRoutes = express.Router();

//  userRoutes.get('/', getUsers);
//  userRoutes.post('/',registerUser);
//  userRoutes.post('/login/',loginUser);



export { itemsRoutes };