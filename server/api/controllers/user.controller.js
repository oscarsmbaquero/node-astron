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

const deleteUser = async (req, res, next) => {

  console.log('Entro');
  try {
    const { userId } = req.params;
    console.log(userId,'usuario');
    const userDelete = await User.findByIdAndDelete(userId);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userDelete },
    });
  } catch (error) {
    return next(error);
  }
};

const editUser = async (req, res, next) => {
 
  const userPhoto = req.file_url;// me traigo la url de la foto
  console.log(userPhoto,37);
  const bodyData = req.body;

  //if (userPhoto) { bodyData.image = userPhoto }
  const { id: userId } = req.authority;
  //{ bodyData.image = userPhoto }
  try {
    const user = await User.findById(userId)
    const userModify = new User(bodyData);

    console.log(userModify,41)
    //Para evitar que se modifique el id de mongo:
    userModify._id = userId;
    //buscamos por el id y le pasamos los campos a modificar
    await User.findByIdAndUpdate(userId, userModify);

    //retornamos respuesta de  los datos del objeto creado 
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userModify },
    });
  } catch (error) {
    console.error(error);
  }
};
// const editUser = async (req, res, next)=>{
//    try {
//          const { id: userId } = req.authority;
//          const userPhoto = req.file_url;
//          const bodyData = req.body;
//          bodyData.image = userPhoto;

//          console.log(bodyData,7070);
//          const userModify = new User(bodyData);
//          userModify._id = userId;
        
//          console.log(userModify,73);
//            await User.findByIdAndUpdate(userId, userModify);

//    }catch{




//    }
// }
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
              rol: user.account_type,
              image: user.image,
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



const assignAviso = ('/', async (req, res, next) => {
  
  
  const { userId, avisoId, estado } = req.body;


  try {

   
    const estadoModify = await Avisos.findByIdAndUpdate(
      avisoId,
      {estado:estado}
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
        { $push: { assigned_avisos: avisoId } },
        { new: true }
    );
    const updatedAviso = await Avisos.findByIdAndUpdate(
      avisoId,
        { $push: { user_assigned: userId } },
        { new: true }
    );
    return res.status(200).json(updatedUser);
} catch (error) {
    return next(error);


}
})
const reAssignAviso = ('/', async (req, res, next) => {
  console.log('Me cago en tu puta madre');
  const { userId, estado, avisoId, idUserOld } = req.body;
    console.log(avisoId,'id_aviso');
    console.log(userId, 'id_tecnico');
    console.log(estado, 'estado');
    console.log(idUserOld,'tecnico antiguo');
 try {
    

  const estadoModify = await Avisos.findByIdAndUpdate(
    avisoId,
    {estado:estado,
     user_assigned:userId 
    }
 );

 const updatedAvisoUser = await User.findByIdAndUpdate(
  idUserOld,
    { $pull: { assigned_avisos: avisoId } },
    { new: true }
);
const updatedAvisoUser2 = await User.findByIdAndUpdate(
  userId,
    { $push: { assigned_avisos: avisoId } },
    { new: true }
);
 
    return res.status(200).json(estadoModify);
  } catch (error) {
    return next(error);
  }
});

const getUserById = async (req, res, next) => {

  try {
      console.log('Entrossss');
      const { id } = req.params;
      console.log(id);
      const userById = await User.findById(id)
      .populate(({path:'assigned_avisos', select :'centro'}))

      
      return res.status(200).json(userById);
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






  export { registerUser, getUsers, loginUser, logoutUser, deleteUser, editUser, assignAviso, reAssignAviso, getUserById };