const express = require("express");
const route = express.Router();
const {createUser,loginUserCtrl,getallUser, getUser, deleteaUser, updateUser} = require("../controllers/usercontroller");
const {authMiddleware, isAdmin} = require("../Middleware/authMiddleware");

route.post("/register", createUser);
route.post("/login", loginUserCtrl);
route.get("/all-user", getallUser);
route.get("/:id", authMiddleware,isAdmin, getUser);
route.delete("/:id", deleteaUser);
// route.put("/:id", updateUser);
route.put("/:edit-user",authMiddleware, updateUser);





module.exports = route;