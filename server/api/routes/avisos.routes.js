import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {isAuth} from '../../authentication/jwt.js';

import {  getAvisos, createAvisos, deleteAviso, editAviso} from '../controllers/avisos.controller.js';

 const avisosRoutes = express.Router();

  avisosRoutes.get('/', getAvisos);
  avisosRoutes.post('/',createAvisos);
  avisosRoutes.delete("/:avisoId",[isAuth], deleteAviso);
  avisosRoutes.put("/:avisoId", editAviso);
//  userRoutes.post('/login/',loginUser);



export { avisosRoutes };