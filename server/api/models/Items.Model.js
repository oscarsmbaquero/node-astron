import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model('Items',itemsSchema );

export { Certificaciones }