import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const certificacionesSchema = new Schema(
  {
    id: { type: String, required: true },
    centro: { type: String, required: true },
    localidad: { type: String, required: true },
    provincia: { type: String, required: true },
    n_puntos: { type: String, required: true },
    realizada: { type: String, required: true },
    certificacion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Certificaciones = mongoose.model('Certificaciones',certificacionesSchema );

export { Certificaciones }