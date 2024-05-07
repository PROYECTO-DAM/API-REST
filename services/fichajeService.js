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

const getFichajesMensualesPorUsuario = async () => {
    return await db.createQuery(
        `
        SELECT year, month, Trabajador, SUM(Horas) AS total_horas
            FROM (SELECT EXTRACT(YEAR FROM Fecha) AS year, EXTRACT(MONTH FROM Fecha) AS month, Trabajador, Fecha, Horas FROM 
                FICHAJE GROUP BY year, month, Trabajador, Fecha, Horas
            ) AS subquery
        GROUP BY year, month, Trabajador, Horas; 
        `
    )
}

module.exports = {
    getFichajeById,
    getFichajesByUser,
    fichar,
    updateFichaje,
    borrarFichaje,
    getFichajesMensualesPorUsuario
}