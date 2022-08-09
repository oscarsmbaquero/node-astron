import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {isAuth} from '../../authentication/jwt.js';

import {  getAvisos, createAvisos, deleteAviso, editAviso, getAvisoById, AddIntervencion} from '../controllers/avisos.controller.js';

 const avisosRoutes = express.Router();

  avisosRoutes.get('/', getAvisos);
  avisosRoutes.get('/:id', getAvisoById);
  avisosRoutes.post('/',createAvisos);
  avisosRoutes.delete("/:avisoId",[isAuth], deleteAviso);
  avisosRoutes.put("/:id", editAviso);
  avisosRoutes.post("/:id", AddIntervencion);
//  userRoutes.post('/login/',loginUser);



export { avisosRoutes };