const express = require("express")
const { signup, login, forgotpass, reset_password } = require("../Controller")
const router = express.Router()


router.post('/signup',signup)

router.post('/login', login)

router.post('/forgot', forgotpass)

router.post('/reset/:token/:id',reset_password)




module.exports=router

