const nominaService = require("../services/nominaService");
const autentication = require("../services/autentication");

const getNominasByUser = async (req, res) => {
    const userId = req.body._id;
    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user) => {
        if(user.rol) {
            let nominas;
            if(userId != null && userId != undefined && userId != '') { nominas =  await nominaService.getNominasByUser(userId)}
            else { nominas =  await nominaService.getNominasByUser(user.sub)}
            if(nominas != null) {
                res.status(201).send({ status: 201, data: nominas });
            } else {
                res.status(404).send({ status: 404, data: "Este usuario no tiene ninguna nomina" });
            }
        } else {
            res.status(401).send({status : 401, message : "No tienes permisos para obtener las nominas del usuario"});
        }
    })
   
}


const getNominaDelMes = async (req, res) => {
   const mes = req.headers.mes;
   const token = req.headers.authorization.split(" ")[1].replace('"','');
   await autentication.decodeToken(token).then(async (user) => {
    if(user.rol) {
        const nomina = await nominaService.getNominaByMonth(mes);
        if(nomina != null) {
            res.status(201).send({ status : 201, data: nomina[0] })
        } else {
            res.status(404).send({ status : 404, data: "La nomina de este mes no esta disponible" })
        }
    } else{
        res.status(401).send({status : 401, message : "No tienes permisos para obtener las nominas del usuario"});
    }
   });
}

module.exports = {
    getNominasByUser,
    getNominaDelMes,
}