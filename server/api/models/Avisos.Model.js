import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const avisosSchema = new Schema(
  {
    n_incidencia: { type: String, required: true },
    localidad: { type: String, required: true },
    centro: { type: String, required: true },
    averia: { type: String, required: true },
    prioridad: { type: String, required: true },
    estado: { type: String, required: true },
    tecnico: { type: String, required: false },
    intervencion: { type: String, required:false},
    fecha_inicio: { type: String, required:false},
    fecha_fin: {type: String, required:false},
    km: {type: Number, required:false},
    user_assigned: [{ type: mongoose.Types.ObjectId, ref: 'User', required: false }],
  },
  {
    timestamps: true,
  }
);

const Avisos = mongoose.model('Avisos',avisosSchema );

export { Avisos }