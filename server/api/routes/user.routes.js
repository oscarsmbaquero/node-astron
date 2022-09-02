import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { registerUser, getUsers, deleteUser, editUser, loginUser, logoutUser,assignAviso, reAssignAviso, getUserById } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.get('/', getUsers);
 userRoutes.delete("/:userId", deleteUser);
 userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);
 userRoutes.post('/register/',registerUser);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.put('/assignAviso', assignAviso);
 userRoutes.put('/reAssignAviso', reAssignAviso);
 userRoutes.get('/:id', getUserById);



export { userRoutes };