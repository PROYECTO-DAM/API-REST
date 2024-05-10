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
        userId: body.userId,
        fecha: body.fecha,
        horas: body.horas,
        proyecto: body.proyecto
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
    const fichajesPorUsuarioYMes = fichajeService.getFichajesMensualesPorUsuario();
    if(fichajesPorUsuarioYMes != null) {
        res.status(201).send({ status:201, data: fichajesPorUsuarioYMes});
    } else {
        res.status(404).send({ status: 404, data: "No hay fichajes de ningun usuario"});
    }
}

module.exports = {
    getFichajesByUser,
    getFichajeById,
    fichar,
    updateFichaje,
    borrarFichaje,
    getFichajesMensualesPorUsuario
}