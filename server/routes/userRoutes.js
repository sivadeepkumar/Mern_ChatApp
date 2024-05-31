const { register,login,setAvatar,getallusers } = require("../controllers/usersControllers")

const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/setAvator/:id",setAvatar)
router.get("/allusers/:id",getallusers)
module.exports = router;

