const express = require("express");
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000

app.use("/uploads",express.static("uploads"))

app.listen(PORT,()=>{
    console.log("Server start")
})