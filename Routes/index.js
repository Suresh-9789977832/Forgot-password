const express = require("express")
const { signup, login, forgotpass, reset_password, get_reset_password } = require("../Controller")
const router = express.Router()


router.post('/signup',signup)

router.post('/login', login)

router.post('/forgot', forgotpass)

router.get('/reset/:token/:id',get_reset_password)

router.post('/reset/:token/:id',reset_password)




module.exports=router

