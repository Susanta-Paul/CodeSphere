import { useState, useEffect } from "react"
import {NavLink,  useNavigate } from "react-router-dom"
import socket from "../Components/Socket"

export default function Create(){


    // const [roomName, setRoomName]=useState()
    const navigate=useNavigate()

    useEffect(()=>{
    
            if(!socket.connected){
                socket.connect()
            }
    
    
            return ()=>{
                socket.off()
            }
    
        }, [])

    function handleForm(e){
        e.preventDefault()
        navigate(`/code/${e.target.roomname.value}`)
    }



    return (
        <div>
            <div className="h-screen w-screen bg-[#121212] text-white flex justify-center items-center ">
                <div className="border-4 border-white p-7 w-[90%] lg:w-[60%]">
                    <div className="bg-sky-500 text-center text-3xl py-3 font-bold"><h1>Create Room</h1></div>
                    <form onSubmit={(e)=>{handleForm(e)}} className="flex justify-center items-center flex-col mt-10">
                        <div className=" text-xl font-medium mb-5">
                            <h3 className="inline">Room Name:</h3>
                            <input
                                className="border-white border-2 ml-4 w-[60%]  "
                             type="text" name="roomname" required placeholder="Enter Room Name"/><br />    
                        </div>
                        <input type="submit" value="Create"
                            className="cursor-pointer font-bold text-xl bg-[#FF9800] text-black w-[90%] p-2 lg:w-[40%] "
                         />
                    </form>
                    <NavLink to="/"><button className="p-3 rounded-lg bg-red-500 cursor-pointer">HOME</button></NavLink>
                </div>
            </div>
        </div>
    )
}