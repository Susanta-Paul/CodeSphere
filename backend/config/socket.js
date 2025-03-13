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
            // console.log("data got for updating the user :)")
            user= await updateUserSocket(data.refreshToken, socket.id)
            // console.log("user Updated", user.username)  // remove this after development
        })

        // Create or join Room 
        socket.on("joinRoom", async (data)=>{
            socket.join(data.roomName)
            await io.to(data.roomName).emit("recieveMessage", {type:"server", message: "Joined the Room", username: user?.username})
            // console.log("message send once")
        })

        // handle Sending Messages
        socket.on("message", async (data)=>{
            await socket.broadcast.to(data.roomName).emit("recieveMessage", {type:"other", message: data.message, username: user.username})
        })

        // handle Code sharing
        socket.on("shareCode", async (data)=>{
            await socket.broadcast.to(data.roomName).emit("recieveCode", {code: data.code})
        })

        // handle leave Room
        socket.on("leaveRoom", (data)=>{
            socket.leave(data.roomName)  // check the leave function 
            io.to(data.roomName).emit("recieveMessage", {type:"server", message: "has left the Room", username: user?.username})
            // console.log(user.username, "has left the room") // remember to delete
        })

        // handle output Code
        socket.on("outputCode", async (data)=>{
            await socket.broadcast.to(data.roomName).emit("getOutput", {output: data.output})
        })

    })
}


module.exports=initializeSocket