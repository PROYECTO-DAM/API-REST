const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function createToken(user){
    const payload = {
        sub : user.id,
        rol : user.role,
    }
    return jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn:'8h'})
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject)=>{
        try {
            const payload = jwt.decode(token, process.env.SECRET_TOKEN);
            resolve(payload);
        } catch (error) {
            reject({status : 500, "data" : "Expirated token or invalid token"})
        }
    })

    return decoded;
}

async function encrypt(password){
    return await bcrypt.hash(password,10);   
}

async function comparePassword(userPassword, dbPassword){
    return await bcrypt.compare(userPassword, dbPassword)
}

module.exports = {
    createToken,
    decodeToken,
    encrypt,
    comparePassword
}