const mongoose = require("./index")

const usersSchema =new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

const usermodal = mongoose.model("user", usersSchema)

module.exports=usermodal