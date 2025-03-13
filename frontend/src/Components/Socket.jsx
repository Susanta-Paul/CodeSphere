import {io} from "socket.io-client"

let socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    autoConnect: false, // Prevent auto-connecting unless explicitly done
});

export const createSocketConnection = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        socket.connect(); // Connect the socket manually
        
        socket.on("connect", () => {
            socket.emit("setSocketId", { refreshToken: refreshToken });
        });
    }
};

createSocketConnection();

export default socket;
