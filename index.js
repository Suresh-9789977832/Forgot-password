const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const express = require("express")
const router = require("./Routes")
const app = express()
const cookie_parser=require("cookie-parser")
const PORT = process.env.PORT

app.use(express.json())
app.use(cors({
    origin: ["https://forgot-password-pvqb.onrender.com"],
    methods: ["POST"],
    credentials:true
}))
app.use(cookie_parser())

app.get('/', (req, res) => {
    res.send({message:"Welcome"})
})


app.use('/user',router)



app.listen(PORT,()=>console.log(`app is running in ${PORT}`))