const bcrypt = require("bcryptjs")
const saltround = 10
const jwt = require("jsonwebtoken")
const usermodal = require("../Modal/login")


const hashedpassword = async (password) => {
    const salt = await bcrypt.genSalt(saltround)
    const hashedpassword=await bcrypt.hash(password,salt)
    return hashedpassword
}


const comparepassword = async (password, hashedpassword) => {
    return bcrypt.compare(password,hashedpassword)
}


const createtoken = async (value) => {
    const token = await jwt.sign(value, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    return token
}





module.exports = {
    hashedpassword,
    comparepassword,
    createtoken,
}