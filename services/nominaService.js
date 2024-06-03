const db = require("./databaseService");

const getNominasByUser = async (_id) => {
    return await db.createQuery("SELECT * FROM NOMINA WHERE Empleado = ?", [_id])
}

const getNominaDelMes = async (mes) => {
    return await db.createQuery("SELECT * FROM NOMINA WHERE Mes = ? AND AÑO = ?", [mes,ano])
}

const insertNomina = async (nomina) => {
    return await db.createQuery("INSERT INTO NOMINA (Empleado, Mes, Pago, Horas, Año) VALUES (?, ?, ?, ?, ?)", [
        nomina.Empleado,
        nomina.Mes,
        nomina.Pago,
        nomina.Horas,
        nomina.Año
    ]);
};

module.exports = {
    getNominasByUser,
    getNominaDelMes,
    insertNomina
}