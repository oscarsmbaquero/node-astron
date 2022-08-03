import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, getUsers, loginUser, logoutUser, deleteUser } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.get('/', getUsers);
 userRoutes.post('/',registerUser);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.delete('/:id',deleteUser);



export { userRoutes };