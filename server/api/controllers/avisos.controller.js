import { Avisos } from "../models/Avisos.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";
import { User } from "../models/User.Model.js";
import { Items } from "../models/Items.Model.js";

const getAvisos = async (req, res, next) => {
  // console.log('Entro');
  try {
    const avisos = await Avisos.find()
      .populate({ path: "tecnicoIntervencion",select: "name"})
      .populate({ path: "materialIntervencion",select: "descripcion"})
      .populate({ path: "user_assigned", select: "name" });
    //  .populate(({path:'material_consumido', select :'descripcion'}));
    //console.log(avisos);
    return res.status(200).json(avisos);
    //console.log(avisos);
    return res.json({
      //  status : 200,
      //  message : httpStatusCode[200],
      data: { avisos: avisos },
    });
    res.send(avisos);
  } catch (error) {
    return next(error);
  }
};

const createAvisos = async (req, res, next) => {
  try {
    const NewAviso = new Avisos({
      n_incidencia: req.body.n_incidencia,
      localidad: req.body.localidad,
      provincia: req.body.provincia,
      centro: req.body.centro,
      averia: req.body.averia,
      prioridad: req.body.prioridad,
      estado: req.body.estado,
      tecnico: req.body.tecnico,
      image: req.body.image,
    });

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
    console.log(req.body, 87);
    const avisoModify = new Avisos(req.body);
    //Para evitar que se modifique el id de mongo:
    avisoModify._id = id;
    const avisoUpdated = await Avisos.findByIdAndUpdate(id, avisoModify);
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
    console.log("Entro");
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
    return next(error);
  }
};

const AddIntervencion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      intervencion,
      km,
      fecha_fin,
      fecha_inicio,
      estado,
      viaje,
      tecnicoIntervencion,
      materialIntervencion,
      motivo,
      item,
      totalHoras,
    } = req.body;
    console.log(tecnicoIntervencion, "tecnicoIntervencion");
    console.log(id, "id_aviso");

    const avisoUpdated = await Avisos.findByIdAndUpdate(id, { estado: estado });
    //añadimos los campos de intervención
    await Avisos.updateOne({ _id: id }, { $push: { km: km } }, { new: true });
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
    const estadoUpdated = await Avisos.findByIdAndUpdate(id, {
      motivo: motivo,
    });
    await Avisos.updateOne(
      { _id: id },
      { $push: { totalHoras: totalHoras } },
      { new: true }
    );
    await Avisos.updateOne(
      { _id: id },
      { $pull: { user_assigned: tecnicoIntervencion } },
      { new: true }
    );
    await User.updateOne(
      { _id: tecnicoIntervencion },
      { $pull: { assigned_avisos: id } },
      { new: true }
    );
    const materialUpdated = await Material.findByIdAndUpdate(
      materialIntervencion,
      { estado: "Averiado" }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { materialIntervencion: materialIntervencion } },
      { new: true }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { item: item } },
      { new: true }
    );

    // const deleteAvisoUSer = await User.findByIdAndUpdate(
    //   tecnicoIntervencion,
    //     { $pull: { assigned_avisos: id }},
    //     { new: true }
    // );
    // console.log(deleteAvisoUSer,13);

    // const deleteUSerAviso = await Avisos.findByIdAndUpdate(
    //   id,
    //     { $pull: { user_assigned: tecnicoIntervencion }},
    //     { new: true }
    // );
    // console.log(deleteUSerAviso,14)

    //elimino user_assigned al dejar aviso pendiente//no funciona. Revisar
    //  const usserAsigned =await Avisos.updateOne(
    //   { _id: id },
    //   { $pull: { user_assigned:{name: tecnicoIntervencion}}},
    //   { new: true }
    //   );
    //   console.log(usserAsigned,'user');
  } catch (error) {}
};

const ShowIntervencion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avisoById = await Avisos.findById(id)
      .populate({ path: "tecnicoIntervencion", select: "name" })
      .populate({ path: "materialIntervencion", select: "descripcion" })
      .populate({ path: "item",select:"codigo"});

    //.populate(({path:'materialIntervencion', select :'descripcion'}));

    //.populate({path:'materialIntervencion', select :'estado'})
    console.log(avisoById.materialIntervencion, "materialIntervencion");
    return res.status(200).json(avisoById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

export {
  getAvisos,
  createAvisos,
  deleteAviso,
  editAviso,
  getAvisoById,
  AddIntervencion,
  ShowIntervencion,
};
