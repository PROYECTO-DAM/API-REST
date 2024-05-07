const db = require("./databaseService");

const getAllProyectos = async () => {
    return db.createQuery("SELECT * FROM PROYECTO");
}

module.exports = {
    getAllProyectos
};