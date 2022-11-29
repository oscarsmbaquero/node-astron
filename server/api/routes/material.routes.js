import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { getMaterial, addMaterial, getMaterialByTecnico, deleteMaterial, traspasoMaterial, envioAlmacen } from '../controllers/material.controller.js';

 const materialRoutes = express.Router();

 materialRoutes.get('/', getMaterial);
 materialRoutes.get("/:id", getMaterialByTecnico);
 materialRoutes.post('/', addMaterial);
 materialRoutes.delete("/:materialId", deleteMaterial);
 materialRoutes.put('/ubicar', traspasoMaterial);
 materialRoutes.put('/envioAlmacen', envioAlmacen);
 //userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);
 



export { materialRoutes };