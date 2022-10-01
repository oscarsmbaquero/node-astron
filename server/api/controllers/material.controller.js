//import { User } from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";

const getMaterial = async (req,res,next) => {
console.log('Entro');
    try {
        const material = await Material.find();
        console.log(material);
        return res.status(200).json(material);
    } catch (error) {
        return next(error)        
    }
  };

  const addMaterial = async ( req, res, next) => {
    
    try {
        const NewMaterial = new Material({
          descripcion : req.body.descripcion,
          estado : req.body.estado,
          unidades : req.body.unidades,
          almacen : req.body.almacen,
          incidencia : req.body.incidencia,
          //image : req.body.image,
        })

        const newMaterialDB = await NewMaterial.save();
        return res.json({
            status: 201,
            message: httpStatusCode[201],
            data: { material: newMaterialDB },
          });
    } catch (error) {
      return next(error); 
    }
};


export { getMaterial, addMaterial };
//getMaterialByUser, addMaterial