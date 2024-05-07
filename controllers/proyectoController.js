const proyectoService = require("../services/proyectoService");
const autentication = require("../services/autentication");

const getAllProyectos = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
        if(user.rol) {
            const proyectos = await proyectoService.getAllProyectos();
            if(proyectos != null) {
                res.status(201).send({ status: 201, data: proyectos });
            } else {
                res.status(404).send({ status: 404, data: "No hay ningun proyecto en la base de datos" });
            }
        } else {
            res.status(401).send({status : 401, message : "No tienes permisos para obtener los proyectos"});
        }
    })
}

module.exports = {
    getAllProyectos
}