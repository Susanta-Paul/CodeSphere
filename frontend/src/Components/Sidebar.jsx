import { useEffect, useRef, useState } from "react"
import Reels from "./Reels"
import socket from "./Socket"
import { useNavigate } from "react-router-dom"

export default function Sidebar(props){

    const [show, setShow]=useState(false)
    const mood=useRef(null)
    const navigate=useNavigate()

    function showMood(){
        if(show){
            mood.current.style.display="none"
            setShow(!show)
        }else{
            mood.current.style.display="block"
            setShow(!show) 
        }
    }

    useEffect(()=>{
        if(!socket.connected){
            socket.connect()

            socket.on("connect", () => {
                socket.emit("setSocketId", { refreshToken: refreshToken });
            });
        }

        return ()=>{
            socket.off()
        }
    }, [])

    function leaveCall(){
        socket.emit("leaveRoom", {roomName: props.roomName})
        navigate("/")
    }

    
    return (
        <div className=" hidden h-screen lg:w-1/4 lg:block text-white">
            <h3 className="text-xl font-medium text-center ">Username is typing...</h3>
            <div className="flex justify-around">
                <button onClick={showMood} className="font-lg p-2 cursor-pointer bg-sky-500 rounded-lg my-2"> Mood Fresh 😉</button>
                <button onClick={leaveCall} className="font-lg p-2 cursor-pointer bg-red-500 rounded-lg my-2">Leave Call</button>
            </div>
            <div ref={mood} className=" hidden border-4 border-white h-[83%] w-full ">
                <Reels/>
            </div>
        </div>
    )
}