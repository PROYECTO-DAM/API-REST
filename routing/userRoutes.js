const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .get("/all", auth, userController.getAllUsers)
  .get("/getUser", auth, userController.getUserById)
  .post("/signIn", userController.signIn)
  .post("/signUp", userController.signUp)
  .put("/updateUser", userController.updateUser)
  .delete("/deleteUser", userController.deleteUser)

module.exports = router;
