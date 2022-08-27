import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const avisosSchema = new Schema(

  //forzar commit 
  {
    n_incidencia: { type: String, required: true },
    localidad: { type: String, required: true },
    provincia: { type: String, required: true },
    centro: { type: String, required: true },
    averia: { type: String, required: true },
    prioridad: { type: String, required: true },
    estado: { type: String, required: true },
    tecnico: { type: String, required: false },
    intervencion: [{ type: String, required:true}],
    fecha_inicio: [{ type: String, required:true}],
    fecha_fin: [{type: String, required:true}],
    km: [{type: Number, required:true}],
    viaje: [{type: Number, required:true}],
    user_assigned: [{ type: mongoose.Types.ObjectId, ref: 'User', required: false }],
    
    user: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Avisos = mongoose.model('Avisos',avisosSchema );

export { Avisos }