const express=require("express")
const app=express()
const http=require("http")
const server=http.createServer(app)
const dotenv=require("dotenv")
dotenv.config()


app.get("/", (req, res)=>{
    res.send("Hey successfull server running")
})

server.listen(process.env.PORT|| 3000 , ()=>{
    console.log(`Server running on port:${process.env.PORT}`)
})