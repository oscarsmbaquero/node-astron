import { User } from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Avisos } from "../models/Avisos.Model.js";


const getUsers = async (req,res,next) =>{
  try {
      const users = await User.find();
      return res.status(200).json(users);
  } catch (error) {
      return next(error)        
  }
};


const  registerUser = async(req, res, next) =>{
  try {
    const { body } = req;
    console.log('Entro');
    // Comprobar usuario
    const previousUser = await User.findOne({ email: body.email });

    if (previousUser) {
      const error = new Error('The user is already registered!');
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);

    // Crear usuario en DB
    const newUser = new User({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: pwdHash,
      account_type: body.account_type,
    });
    const savedUser = await newUser.save();

    // Respuesta
    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id
      }
    });

  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next)=>{
  console.log('Entro');
  try {
          const { body } = req;
          console.log(body,60);
          // Comprobar email
          const user = await User.findOne({ email: body.email });
      
          // Comprobar password
          const isValidPassword = await bcrypt.compare(body.password, user?.password ?? '');
          // Control de LOGIN
          if (!user || !isValidPassword) {
            const error = {
              status: 401,
              message: 'The email & password combination is incorrect!'
            };
            return next(error);
          }
      
          // TOKEN JWT
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
      
          // Response
          return res.json({
            // status: 200,
            // message: httpStatusCode[200],
            data: {
              id: user._id,
              email: user.email,
              token: token,
              name:user.name,
              rol: user.account_type
            },
          });
        } catch (error) {
          console.log(error);
          return next(error);
        }


};
const logoutUser = async (req, res, next) => {

  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: 'logged out',
      token: null
    })
  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDelete = await User.findByIdAndDelete(id);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userDelete },
    });
  } catch (error) {
    return next(error);
  }
};

const addNewAviso = ('/', async (req, res, next) => {
  
  console.log('entroHostias');
  const { userId } = req.body;
  const { avisoId } = req.body;
  console.log(avisoId,userId,137);
  try {

    

     const updatedUser = await User.findByIdAndUpdate(
      userId,
        { $push: { assigned_avisos: avisoId } },
        { new: true }
    );
    const updatedAviso = await Avisos.findByIdAndUpdate(
      avisoId,
        { $push: { avisos_assigned: userId } },
        { new: true }
    );
    return res.status(200).json(updatedUser);
} catch (error) {
    return next(error);


}
})






  export { registerUser, getUsers, loginUser, logoutUser, deleteUser, addNewAviso };