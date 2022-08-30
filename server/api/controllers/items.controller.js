import { Items } from "../models/Items.Model.js";
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";


const getItems = async (req,res,next) =>{
    try {
        const items = await Items.find();
        return res.status(200).json(items);
    } catch (error) {
        return next(error)        
    }
  };


  export {  getItems }; 
  