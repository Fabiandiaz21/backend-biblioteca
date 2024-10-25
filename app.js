const express = require('express')
const mongoose = require('mongoose')
const holders = require("./routers/holder")
const laptops = require("./routers/laptops")
const entrys = require("./routers/entry")
require('dotenv').config()


const app = express()
app.use(express.json())
app.use("/api/holder",holders)
app.use ("/api/laptop",laptops)
app.use ("/api/entry",entrys)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect(process.env.CNX_MONGO)
    .then(() => console.log('Connected!'))
    .catch((error)=> console.log(error))
})

