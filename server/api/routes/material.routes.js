import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { getMaterial, addMaterial, getMaterialByTecnico } from '../controllers/material.controller.js';

 const materialRoutes = express.Router();

 materialRoutes.get('/', getMaterial);
 materialRoutes.get("/:almacen", getMaterialByTecnico);
 materialRoutes.post('/', addMaterial);
 //userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);
 



export { materialRoutes };