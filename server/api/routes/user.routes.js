import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';

import { registerUser, getUsers, deleteUser, loginUser, logoutUser,assignAviso, reAssignAviso, getUserById } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.get('/', getUsers);
 userRoutes.delete("/:userId", deleteUser);
 userRoutes.post('/register/',registerUser);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.put('/assignAviso', assignAviso);
 userRoutes.put('/reAssignAviso', reAssignAviso);
 userRoutes.get('/:id', getUserById);



export { userRoutes };