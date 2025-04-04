const express = require("express");
const route = express.Router();
const {createUser,loginUserCtrl,getallUser, getUser, deleteaUser, updateUser} = require("../controllers/usercontroller");
const authMiddleware = require("../Middleware/authMiddleware");

route.post("/register", createUser);
route.post("/login", loginUserCtrl);
route.get("/all-user", getallUser);
route.get("/:id", authMiddleware, getUser);
route.delete("/:id", deleteaUser);
route.put("/:id", updateUser);




module.exports = route;