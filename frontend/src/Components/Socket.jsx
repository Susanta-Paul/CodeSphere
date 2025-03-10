import {io} from "socket.io-client"

let socket;

export const createSocketConnection= ()=>{
    const refreshToken=localStorage.getItem("refreshToken")
    if(refreshToken){
        socket=io(`${import.meta.env.VITE_BASE_URL}`)
        socket.emit("setSocketId", {refreshToken: refreshToken})
    }
}

createSocketConnection();

export default socket;