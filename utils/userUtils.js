const db = require("../services/databaseService")

const identifyId = async (userId) =>{
    return await db.createQuery(`SELECT * FROM USERS WHERE id = ?`, [userId]);
}

const identifyUser = async(email, name) => {
    return await db.createQuery(`SELECT * FROM users WHERE fullname = ? OR email = ?`, [name, email]);
}

module.exports = {
    identifyId,
    identifyUser
}