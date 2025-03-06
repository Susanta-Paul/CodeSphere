const express=require("express")
const app=express()
const http=require("http")
const server=http.createServer(app)
const dotenv=require("dotenv")
dotenv.config()
const userRoutes=require("./routes/user.routes")
const connectToDb=require("./db/db")
connectToDb()


app.use("/users", userRoutes)


server.listen(process.env.PORT|| 3000 , ()=>{
    console.log(`Server running on port:${process.env.PORT}`)
})