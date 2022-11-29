import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    account_type: { type: String, required: true },
    image: { type: String },
    assigned_avisos: { type: mongoose.Types.ObjectId, ref: 'Avisos' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }