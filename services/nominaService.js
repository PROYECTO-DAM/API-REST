const db = require("./databaseService");

const getNominasByUser = async (_id) => {
    return await db.createQuery("SELECT * FROM NOMINA WHERE Empleado = ?", [_id])
}

const getNominaDelMes = async (mes) => {
    return await db.createQuery("SELECT * FROM NOMINA WHERE Mes = ? AND AÑO = ?", [mes,ano])
}

module.exports = {
    getNominasByUser,
    getNominaDelMes
}