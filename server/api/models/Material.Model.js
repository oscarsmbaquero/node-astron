import mongoose from "mongoose";
const Schema = mongoose.Schema;

const materialSchema = new Schema(
    {
     descripcion: { type:String, required:true },
     estado: { type:String, required:true },
     incidencia: { type:String, required:false },
     //almacen: { type: mongoose.Types.ObjectId , required: false  },
     almacen: { type: mongoose.Types.ObjectId , ref: 'User',required: false  },
     unidades: { type:Number, required:true }, 
     tipo: { type:String, required: true }, 
     //name_almacen: { type: mongoose.Types.ObjectId, ref: 'User' , required: false },
    },
    {
        timestamps:true,
    }
    );

    const Material = mongoose.model('Material', materialSchema);

    export { Material }