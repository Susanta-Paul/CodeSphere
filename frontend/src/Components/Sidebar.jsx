import { useRef, useState } from "react"
import Reels from "./Reels"

export default function Sidebar(){

    const [show, setShow]=useState(false)
    const mood=useRef(null)

    function showMood(){
        if(show){
            mood.current.style.display="none"
            setShow(!show)
        }else{
            mood.current.style.display="block"
            setShow(!show) 
        }
    }

    
    return (
        <div className=" hidden h-screen lg:w-1/4 lg:block text-white">
            <h3 className="text-xl font-medium text-center ">Username is typing...</h3>
            <div className="flex justify-around">
                <button onClick={showMood} className="font-lg p-2 cursor-pointer bg-sky-500 rounded-lg my-2"> Mood Fresh 😉</button>
                <button className="font-lg p-2 cursor-pointer bg-red-500 rounded-lg my-2">Leave Call</button>
            </div>
            <div ref={mood} className=" hidden border-4 border-white h-[83%] w-full ">
                <Reels/>
            </div>
        </div>
    )
}