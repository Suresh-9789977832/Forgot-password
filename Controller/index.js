const bcrypt = require("bcryptjs")
const auth=require("../Common/index")
const usermodal = require("../Modal/login")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")


const signup = async (req, res) => {

    try {
        let name = req.body.name
        let email=req.body.email
        let password = req.body.password
    
        password = await auth.hashedpassword(password)
        
        const user = await usermodal.findOne({ email: email })
            
        if (!user) {
            let data=await usermodal.create({name,email,password})
            res.status(200).send({
                message: "user created successfully",
                data
            })
        }
        else {
            res.status(400).send({
                message:`${email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}

const login = async(req,res) => {
    
    try {
        let email = req.body.email
        let password = req.body.password

        const user = await usermodal.findOne({ email: email })
        
        if (user) {
            if (await auth.comparepassword(password, user.password)) {
                const token = await auth.createtoken({ name: user.name, email: user.email })
                res.status(200).send({
                    message: "User Login successfully",
                    token
                })
            }
            else {
                 res.status(400).send({
                message: "Invalid password",
            })
            }
        }
        else {
            res.status(400).send({
                message: "Please enter the registered email",
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}

const forgotpass = async (req, res) => {
    const email = req.body.email
    const user = await usermodal.findOne({ email: email })
    try {
        if (user) {
            const token = await auth.createtoken({ name: user.name, email: user.email ,id:user._id})
            const id = user._id
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'sanddysuresh@gmail.com',
                  pass: 'ydbo imta ewqu ceku'
                }
              });
              
              var mailOptions = {
                from: 'sanddysuresh@gmail.com',
                to: `${email}`,
                subject: 'Reset your password',
                text: `https://forgot-password-pvqb.onrender.com/reset/${token}/${id}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {    
                  console.log(error);
                } else {
                    return res.send({
                        message: "Mail send successfully please check your mail",
                        token,
                        id
                 })
                }
              });
        }   
        else {
            res.status(400).send({
                message:"User not exists"
            })
        }
     
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }


   
}

const get_reset_password = async (req, res) => {
    try {
        let { token} = req.params

        const verifytoken=jwt.verify(token,process.env.JWT_SECRET)
            
        if (!verifytoken) {
            res.status(400).send({
                message:"user not exists"
            })
        }
        else {
            res.status(200).send({
                message:"valid user"
            })
        } 
    } catch (error) {
            res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}

const reset_password = async (req, res) => {

    try {
        let password=req.body.password
        let { token, id } = req.params
          
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!verifytoken) {
            {
                res.staus(400).send({
                    message:"user not exists"
                })
            }
            
        }
        else {
            const newpassword = await auth.hashedpassword(password)
            await usermodal.findByIdAndUpdate({_id: id},{password:newpassword})
            res.status(200).send({
                message:"password set successfully"
            })
        }

    } catch (error) {
            res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
   
}




module.exports = {
    signup,
    login,
    forgotpass,
    reset_password,
    get_reset_password
}