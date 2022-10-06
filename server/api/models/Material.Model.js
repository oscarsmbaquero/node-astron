import mongoose from "mongoose";
const Schema = mongoose.Schema;

const materialSchema = new Schema(
    {
     descripcion: { type:String, required:true },
     estado: { type:String, required:true },
     incidencia: { type:String, required:false },
     almacen: { type:String, required:true },
     unidades: { type:Number, required:true }, 
     tipo: { type:String, required: true }, 

     user_name: { type: mongoose.Types.ObjectId, ref: 'User' , required: false },
     //user_assigned: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
     //user_assigned: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
    },
    {
        timestamps:true,
    }
    );

    const Material = mongoose.model('Material', materialSchema);

    export { Material }