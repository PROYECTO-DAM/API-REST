const fichajeService = require("../services/fichajeService");
const autentication = require("../services/autentication");

const getFichajesByUser = async (req, res) => {
    const userId = req.headers._id;
    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
        if(user.rol) {
            let fichajes;
            if(userId != null && userId != undefined && userId != '' && userId != '0') { fichajes = await fichajeService.getFichajesByUser(userId)}
            else {fichajes = await fichajeService.getFichajesByUser(user.sub)}
            if(fichajes != null) {
                res.status(201).send({ status: 201, data: fichajes });
            } else {
                res.status(404).send({ status: 404, data: "Este usuario no tiene dias fichados" });
            }
        } else {
            res.status(401).send({status : 401, message : "No tienes permisos para obtener los fichajes del usuario"});
        }
    })
   
}

const getFichajeById = async (req, res) => {
    const id = req.headers.id;

   const token = req.headers.authorization.split(" ")[1].replace('"','');
   await autentication.decodeToken(token).then(async (user) => {
    if(user.rol) {
        const fichaje = await fichajeService.getFichajeById(id);
        if(fichaje != null) {
            res.status(201).send({ status : 201, data: fichaje[0] })
        } else {
            res.status(404).send({ status : 404, data: "El fichaje no existe" })
        }
    }
   });
}

const fichar = async (req, res) => {
    const { body } = req; 
 
    const fichar = {
        userId: body.Trabajador,
        fecha: body.Fecha,
        horas: body.Horas,
        proyecto: body.Proyecto
    }

    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
    if(user.rol || body.userId == user.sub) {
        const fichaje = fichajeService.fichar(fichar);
        if(fichaje != null) {
            res.status(201).send({ status : 201, data: fichaje[0] })
        } else {
            res.status(404).send({ status : 404, data: "El fichaje no existe" })
        }
    }
   });
}

const updateFichaje = async (req, res) => {
    const { body } = req; 
 
    const fichar = {
        userId: body.userId,
        fecha: body.fecha,
        horas: body.horas,
        proyecto: body.proyecto
    }

    const id = body._id;

    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
    if(user.rol || body.userId == user.sub) {
        const fichaje = fichajeService.updateFichaje(fichar);
        if(fichaje != null) {
            const searchedFichaje = fichajeService.getFichajeById(id)
            res.status(201).send({ status : 201, data: fichaje[0] })
        } else {
            res.status(404).send({ status : 404, data: "El fichaje no existe" })
        }
    }
   });
}

const borrarFichaje = async (req, res) => {
    const { body } = req;
    const _id = body._id

    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
    if(user.rol) {
        const fichaje = fichajeService.borrarFichaje(_id);
        if(fichaje != null) {
            res.status(201).send({ status : 201, data: "OK" })
        } else {
            res.status(404).send({ status : 404, data: "No tienes permisos para borrar el fichaje" })
        }
    }
   });
}

const getFichajesMensualesPorUsuario = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1].replace('"','');
    try {
        const user = await autentication.decodeToken(token);
        if (user.rol) {
            const fichajesPorUsuarioYMes = await fichajeService.getFichajesMensualesPorUsuario();
            if (fichajesPorUsuarioYMes.length > 0) {
                console.log(fichajesPorUsuarioYMes);
                res.status(200).send({ status: 200, data: fichajesPorUsuarioYMes });
            } else {
                res.status(404).send({ status: 404, data: "No hay fichajes de ningún usuario" });
            }
        } else {
            res.status(403).send({ status: 403, data: "Acceso denegado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, data: "Error interno del servidor" });
    }
};

module.exports = {
    getFichajesByUser,
    getFichajeById,
    fichar,
    updateFichaje,
    borrarFichaje,
    getFichajesMensualesPorUsuario
}