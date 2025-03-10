const socketServer = require("socket.io")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.models")


async function updateUserSocket(refreshToken, socketId) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
    const newUser= await userModel.findOneAndUpdate({username: decoded?.username}, {
        $set: [{socketId: socketId}]
    })
    return newUser
}



function initializeSocket(server){
    const io=socketServer(server, {
        cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

    io.on("connection", (socket)=>{
        console.log("new Client Connected:", socket.id)

        let user;

        socket.on("setSocketId", async (data)=>{
            // console.log(data)
            user= await updateUserSocket(data.refreshToken, socket.id)
        })

        // Create or join Room 
        socket.on("joinRoom", (data)=>{
            socket.join(data.roomName)
            io.to(data.roomName).emit("recieveMessage", {type:"server", message: "Joined the Room", username: user.username})
        })

        // handle Sending Messages
        socket.on("message", (data)=>{
            socket.to(data.roomName).emit("recieveMessage", {type:"other", message: data.message, username: user.username})
        })

    })
}


module.exports=initializeSocket