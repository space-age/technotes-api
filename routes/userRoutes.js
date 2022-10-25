const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/") //will be at the root of /user
  .get(usersController.getAllUsers) //GET requests will do the following
  .post(usersController.createNewUser) //POST requests will do the following
  .patch(usersController.updateUser) //PATCH (update)  requests will do the following
  .delete(usersController.deleteUser); //DELETE requests will do the following

module.exports = router;
