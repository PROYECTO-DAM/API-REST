const userService = require("../services/userService");
const { validationResult } = require('express-validator');
const autentication = require("../services/autentication");

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1].replace('"','');
  await autentication.decodeToken(token).then(async (user) => {
    if(user.rol) {
      const allUsers = await userService.getAllUsers();
      if (allUsers != null) {
        res.status(200).send({ status: 200, data: allUsers });
      } else {
        res.status(500).send({ status: 404, data: "No se han encontrado usuarios" });
      }
    } else {
      res.status(500).send({ status: 500, data: "Error interno" });
    }
  });
  
};

const getUserById = async (req, res) => {
  const id = req.headers.id;
  const token = req.headers.authorization.split(" ")[1].replace('"','');
  await autentication.decodeToken(token).then(async (user) => {
    if(user.rol) {
      let searchedUser;
      if(id != null && id != undefined && id != -1) {searchedUser = await userService.getUserById(id)}
      else { searchedUser = await userService.getUserById(user.sub)}
      if (searchedUser != null) {
        res.status(201).send({ status: 201, data: searchedUser[0] });
      } else {
        res.status(404).send({ status: 404, data: "El usuario no existe" });
      }
    } else {
      res.status(500).send({ status: 500, data: "Error interno" });
    }
  });
};

const signIn = async (req, res) => {
  let id;
  let token = null;
  if(req.headers.authorization != null || req.headers.authorization != undefined) {
    token = req.headers.authorization.split(" ")[1].replace('"','');
  }  
  if(token != null || token != undefined || token != "noToken") {
    await autentication.decodeToken(token).then(tokenData => {
      if(tokenData != null) {
        id = tokenData.sub;
      }
    }); 
  } else {
    id = req.body._id;
  }
  if(id != null || id != undefined) {
    //tests con postman
    await userService
    .signIn(id, req.body.password)
    .then((response) => {
      res.status(response.status).send({ status: response.status, data: response.data });
    })
    .catch(() => {
      res.status(500).send({ status: 500, data: "No se pudo encontrar el usuario" });
    });
  } else {
    //codigo que usan las aplicaciones
    await userService
    .signInWithEmailorName(req.body.email, req.body.name, req.body.password)
    .then((response) => {
      res.status(response.status).send({status: response.status, data:response.data});
    })
    .catch(() => {
      res.status(500).send({ status: 500, data: "No se pudo encontrar el usuario" });
    });
  }
};

const signUp = async (req, res) => {
  let { body } = req;
  try {
    const createdUser = await userService.signUp(body);
    if (createdUser !== undefined) {
      res.status(200).send({ status: 200, data: createdUser });
    } else {
      res.status(401).send(createdUser);
    }
  } catch (error) {
    res
      .status(500)
      .send({
        status: 500,
        data: "El usuario no pudo ser creado, revisa los campos",
      });
  }
};

const updateUser = async (req, res) =>{
  const { body } = req; 
 
  let _id;
  if (body._id != undefined) {
    _id = body._id;
  } 

  let errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).send({status : 400, data : "El usuario no pudo ser actualizado, revisa los campos" });
  }
    const token = req.headers.authorization.split(" ")[1].replace('"','');
    await autentication.decodeToken(token).then(async (user)=>{
      if(user.rol || _id == user.sub){
        const updatedUser = await userService.updateUser(_id, body);
        if(updatedUser != null) {
          const searchedUser = await userService.getUserById(_id);
          res.status(200).send({status : 201, data : searchedUser[0] });
        } else {
          res.status(500).send({status: 500, data:"El usuario no existe"})
        }
      }else{
        res.status(401).send({status : 401, message : "No tienes permisos para actualizar el usuario"});
      }
    }).catch(error =>{
      res.status(401).send({status :401, error : error});
    })
}

const deleteUser = async (req,res) => {
  const { body } = req; 
 
  let _id;
  if (body._id != undefined) {
    _id = body._id;
  } 

  const token = req.headers.authorization.split(" ")[1].replace('"','');
  await autentication.decodeToken(token).then(async (user)=>{
    if(user.rol || _id == user.sub){
      await userService.deleteUser(_id)
      res.status(200).send({status : 201, message : "OK"});
    }else{
      res.status(401).send({status : 401, message : "No tienes permisos para borrar el usuario"});
    }
  }).catch(error =>{
    console.log(error)
    res.status(401).send({status :401, error : error});
  })
}


module.exports = {
  getUserById,
  getAllUsers,
  signIn,
  signUp,
  updateUser,
  deleteUser,
};
