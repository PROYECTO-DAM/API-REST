const db = require("./databaseService");

const getFichajeById = async (_id) => {
    return await db.createQuery("SELECT * FROM FICHAJE WHERE ID = ?", [_id])
}

const getFichajesByUser = async (userId) => {
    return await db.createQuery("SELECT * FROM FICHAJE WHERE Trabajador = ?", [userId])
}

const fichar = async (fichaje) => {
    await db.createQuery("INSERT INTO FICHAJE(Trabajador, Fecha, Horas, Proyecto) VALUES (?,?,?,?)", [
        fichaje.userId,
        fichaje.fecha,
        fichaje.horas,
        fichaje.proyecto
    ])
}

const updateFichaje = async (fichaje) => {
    await db.createQuery("UPDATE FICHAJE SET Trabajador = ?, Fecha = ?, Horas = ?, Proyecto = ?", [
        fichaje.userId,
        fichaje.fecha,
        fichaje.horas,
        fichaje.proyecto
    ])
}

const borrarFichaje = async (_id) => {
    return await db.createQuery("DELETE FROM FICHAJE WHERE ID = ?", [_id]);
}

module.exports = {
    getFichajeById,
    getFichajesByUser,
    fichar,
    updateFichaje,
    borrarFichaje
}