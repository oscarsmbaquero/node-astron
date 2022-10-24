import { Avisos } from "../models/Avisos.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";
import { User } from "../models/User.Model.js"


const getAvisos = async ( req, res, next) =>{
  // console.log('Entro');
    try {
        const avisos = await Avisos.find().populate(({path:'user_assigned', select :'name'}));
        //console.log(avisos);
        return res.status(200).json(avisos);
         //console.log(avisos);
        return res.json({
          //  status : 200,
          //  message : httpStatusCode[200],
           data : { avisos: avisos },
        });
        res.send(avisos);
    } catch (error) {
        return next(error)
    }
};
// const getAvisos = async ( req, res, next) =>{
//     // console.log('Entro');
//       try {
//           const avisos = await Avisos.find().populate(({path:'user', select :'name'}));
//           console.log(avisos);
//           return res.status(200).json(avisos);
//            console.log(avisos);
//           return res.json({
//             //  status : 200,
//             //  message : httpStatusCode[200],
//              data : { avisos: avisos },
//           });
//           res.send(avisos);
//       } catch (error) {
//           return next(error)
//       }
//   };

  const createAvisos = async ( req, res, next) => {
    
      try {
          const NewAviso = new Avisos({
            n_incidencia : req.body.n_incidencia,
            localidad : req.body.localidad,
            provincia : req.body.provincia,
            centro : req.body.centro,
            averia : req.body.averia,
            prioridad : req.body.prioridad,
            estado : req.body.estado,
            tecnico : req.body.tecnico,
            image : req.body.image,
          })
  
          const newAvisoDB = await NewAviso.save();
          return res.json({
              status: 201,
              message: httpStatusCode[201],
              data: { aviso: newAvisoDB },
            });
      } catch (error) {
        return next(error); 
      }
  };

  const deleteAviso = async (req, res, next) => {
    try {
      const { avisoId } = req.params;
      console.log(avisoId);
      const avisoDelete = await Avisos.findByIdAndDelete(avisoId);

      
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { aviso: avisoDelete },
      });
    } catch (error) {
      return next(error);
    }
};


const editAviso = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.body,87);
      const avisoModify = new Avisos(req.body);
      //Para evitar que se modifique el id de mongo:
      avisoModify._id = id;
      const avisoUpdated = await Avisos.findByIdAndUpdate(
        id,
        avisoModify
      );
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { aviso: avisoUpdated },
      });
    } catch (error) {
      return next(error);
    }
};


const getAvisoById = async (req, res, next) => {

    try {
        console.log('Entro');
        const { id } = req.params;
        console.log(id);
        const avisoById = await Avisos.findById(id);
        return res.status(200).json(avisoById);
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

const AddIntervencion = async  (req, res, next) =>{
  
   try {    
    const { id } = req.params;
    const { intervencion, km, fecha_fin, fecha_inicio, estado, viaje, tecnicoIntervencion, materialIntervencion, motivo, totalHoras }=req.body;
    //console.log(totalHoras,'totalHoras');
    // const avisoModify = new Avisos(req.body);
    // avisoModify._id = id;
    //modifico el estado
    //console.log(tecnicoIntervencion,viaje,133);
    const avisoUpdated = await Avisos.findByIdAndUpdate(
      id,
      {estado:estado}
    );
    //añadimos los campos de intervención
  await Avisos.updateOne(
    { _id: id },
    { $push: { km: km } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { intervencion: intervencion } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { fecha_fin: fecha_fin } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { fecha_inicio: fecha_inicio } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { viaje: viaje } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { tecnicoIntervencion: tecnicoIntervencion } },
    { new: true }
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { materialIntervencion: materialIntervencion } },
    { new: true }
  );
  const estadoUpdated = await Avisos.findByIdAndUpdate(
    id,
    {motivo:motivo}
  );
  await Avisos.updateOne(
    { _id: id },
    { $push: { totalHoras: totalHoras } },
    { new: true }
  );
  await User.updateOne(
    { name: tecnicoIntervencion },
    { $pull: { assigned_avisos: id } },
    { new: true }
  );
  const materialUpdated = await Material.findByIdAndUpdate(
    materialIntervencion,
    {estado:'Averiado'},
  );
  //elimino user_assigned al dejar aviso pendiente//no funciona. Revisar
  //  const usserAsigned =await Avisos.updateOne(
  //   { _id: id },
  //   { $pull: { user_assigned:{name: tecnicoIntervencion}}},
  //   { new: true }
  //   );
    
  



   } catch (error) {
    
   }

}

const ShowIntervencion = async (req, res, next) =>{

  try {
    console.log('Entro o no entro');
    const { id } = req.params;
    console.log(id);
    const avisoById = await Avisos.findById(id)
    .populate({path:'materialIntervencion', select :'estado'})
    return res.status(200).json(avisoById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
} catch (error) {
    return next(error)
}
}




// //FUNCION PARA VINCULAR USUARIO A OFERTA DE TRABAJO- EN PRUEBAS-- OSCAR
// const addUserToJob = async (req, res, next) => {

//     try {
//         const { _id: jobId } = req.body;
//         const { id: userId } = req.authority;

//         const findJob = await Job.findById(jobId);
//         const findUser = await User.findById(userId);

//         //controlar que no se pueda agregar el mismo usuario o trabajo dos veces
//         if (findJob.candidate_list.indexOf(userId) !== -1 || findUser.applied_jobs.indexOf(jobId) !== -1) {
//             const error = new Error('this user already applied to this job');
//             return next(error);
//         }

//         const newNotification = await Notification.create({
//             from: userId,
//             to: findJob.recruiter_id,
//             view_status: "not seen",
//             jobId: jobId,
//             type: "job_application"
//         });

//         if (!newNotification) {
//             const error = new Error('error creating the notification');
//             return next(error);
//         };

//         await User.updateOne(
//             { _id: userId },
//             { $push: { applied_jobs: jobId } },
//             { new: true }
//         );

//         await Job.updateOne(
//             { _id: jobId },
//             { $push: { candidate_list: userId } },
//             { new: true }
//         );
//         return res.status(200).json(findJob);
//     } catch (error) {
//         return next(error);
//     }
// }

// const deleteUserFromJob = async (req, res, next) => {

//     try {
//         const { _id: jobId } = req.body;
//         const { id: userId } = req.authority;

//         await User.updateOne(
//             { _id: userId },
//             { $pull: { applied_jobs: jobId } }
//         );

//         const deleteUserFromJob = await Job.findByIdAndUpdate(
//             jobId,
//             { $pull: { candidate_list: userId } }
//         );
//         return res.status(200).json(deleteUserFromJob);
//     } catch (error) {
//         return next(error);
//     }
// }

//funcion para eliminar subscripciond e usuario, En pruebas. Oscar
//   const deleteUserFromJob = async (req, res, next) => {

//     try {       
//     const { _id } = req.body;  
//     const { userId } = req.body;
//     //console.log(_id,userId,5);
//     const updatedJob = await Job.findByIdAndUpdate(
//         _id ,
//           { $push: { candidate_list: userId } },
//           { new: true }
//       );
//       return res.status(200).json(updatedJob);
//   } catch (error) {
//       return next(error);
//   }
//   }

// const findJobByName = async (req, res, next) => {
//     const { name } = req.params;
//     console.log(name);
//     try {
//         const companieByName = await Companies.find({ name: name });
//         return res.json({
//             // status: 200,
//             // message: httpStatusCode[200],
//             data: { companie: companieByName }
//         })
//     } catch (error) {
//         next(error)
//     }
// };

// const editNamejob = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const NameJob = new Companies(req.body);
//         //Para evitar que se modifique el id de mongo:
//         Companies._id = id;
//         const NameJobUpdate = await Companies.findByIdAndUpdate(
//             id,
//             NameJob
//         );
//         return res.json({
//             status: 200,
//             message: httpStatusCode[200],
//             data: { namejob: NameJobUpdate },
//         });
//     } catch (error) {
//         return next(error);
//     }
// };


export { getAvisos, createAvisos, deleteAviso, editAviso, getAvisoById, AddIntervencion, ShowIntervencion };