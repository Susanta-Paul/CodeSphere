import {Editor} from "@monaco-editor/react"
import { useEffect, useState } from "react"
import SidebarParticipants from "../Components/SidebarParticipants"
import Sidebar from "../Components/Sidebar"
import { useParams } from "react-router-dom"
import socket from "../Components/Socket"



export default function Code(){

    
    const {roomName}= useParams()
    const [language, setLanguage]=useState("python")
    const [code, setCode]=useState("")
    
    useEffect(()=>{
        if(!socket.connected){
            socket.connect()
        }

        socket.emit("joinRoom", {roomName: roomName})

    },[])
    
    function handleCode(value){
        setCode(value)
    }

    function handleRun(){
        console.log(code)
    }



    return(
        <div>
            <div className="pt-10 h-screen w-screen bg-[#121212] flex justify-between overflow-hidden lg:pt-5">
                <Sidebar/>
                <div className=" h-screen w-screen lg:w-[60%] p-4">
                    <div>
                        <h1 className="font-bold text-[#A6E22E] text-3xl lg:text-5xl">Code Sphere Code Editor</h1>
                        <div className="text-white text-xl mt-4 flex justify-around">
                            <div>
                                <h2 className="inline font-medium">Choose language: </h2>
                                <select className="cursor-pointer bg-gray-600 text-2xl ml-4"
                                    onChange={(e)=>{setLanguage(e.target.value)}}
                                >
                                    <option value="python">Python</option>
                                    <option value="javascript">Javascript</option>
                                    <option value="java">Java</option>
                                    <option value="c++">C++</option>
                                </select></div>
                            <button onClick={handleRun} className="cursor-pointer bg-blue-400 p-2 ml-4">Run</button>
                        </div>
                    </div>
                    <div className="w-full h-[60%] mt-7">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            value={code}
                            theme="vs-dark"
                            onChange={handleCode}
                            options={{
                                minimap: {enabled: false},
                                fontSize: 18
                            }}
                        />
                    </div>
                    <div className="bg-white w-full h-[20%] mt-5 overflow-scroll lg:h-[21%]"></div>
                </div>
                <SidebarParticipants/>
            </div>
        </div>
    )
}