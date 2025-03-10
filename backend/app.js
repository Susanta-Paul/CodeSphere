const express=require("express")
const app=express()
const http=require("http")
const server=http.createServer(app)
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()
const userRoutes=require("./routes/user.routes")
const connectToDb=require("./db/db")
connectToDb()
const cookieParser=require("cookie-parser")
const initializeSocket=require("./config/socket")
initializeSocket(server)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true   
}))
app.use("/users", userRoutes)


server.listen(process.env.PORT|| 3000 , ()=>{
    console.log(`Server running on port:${process.env.PORT}`)
})