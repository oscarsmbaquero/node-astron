//import { User } from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";

const getMaterial = async (req,res,next) => {

    try {
        const material = await Material.find().populate(({path:'name_almacen', select :'name'}));
        //console.log(material,'material')
        
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
          tipo : req.body.tipo,
          almacen : req.body.almacen,
          incidencia : req.body.incidencia,
          //image : req.body.image,
         
        })
        console.log(NewMaterial,'almacen')
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

const getMaterialByTecnico = async (req, res, next) => {

  try {
      

      const { almacen } = req.params;
      console.log(almacen,'almacen')
      //const { id: userId } = req.authority;populate(({path:'user_assigned', select :'name'}));
      //console.log(id,'id');
      const materialById = await Material.find({almacen : almacen})
      console.log(materialById,'materialById')
        //.populate(({path:'name_almacen', select :'name'}));
      return res.status(200).json(materialById);
      // return res.json({
      //     status: 200,
      //     message: httpStatusCode[200],
      //     data: { jobs: jobbyid },
      // });
      //res.send(jobbyid);
  } catch (error) {
      return next(error)
  }
};

const deleteMaterial = async (req, res, next) => {
  
    try {
      const { materialId } = req.params;
      
      const materialDelete = await Material.findByIdAndDelete(materialId);

      
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { material: materialDelete },
      });
    } catch (error) {
      return next(error);
    }
};


export { getMaterial, addMaterial, getMaterialByTecnico, deleteMaterial };
//getMaterialByUser, addMaterial