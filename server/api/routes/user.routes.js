import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';

import { registerUser, getUsers, loginUser, logoutUser, deleteUser,addNewAviso } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.get('/', getUsers);
 userRoutes.post('/register/',registerUser);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.delete('/:id',deleteUser);
 userRoutes.put('/assignAviso', addNewAviso);



export { userRoutes };