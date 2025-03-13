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
    const langId={"python": 71, "javascript": 63, "java": 91, "c++": 54}
    const [result, setResult]=useState("")
    const [inputs, setInputs]=useState("")
    
    useEffect(()=>{
        if(!socket.connected){
            socket.connect()
            
            socket.on("connect", () => {
                socket.emit("setSocketId", { refreshToken: refreshToken });
            });
        }

        socket.emit("joinRoom", {roomName: roomName})

        socket.on("recieveCode", (data)=>{
            setCode(data.code)
        })

        socket.on("getOutput", (data)=>{
            setResult(data.output)
        })

        return () => {
            socket.emit("leaveRoom", {roomName: roomName})
            socket.off(); // Remove all listeners for this socket
        };

    },[])

    
    async function uploadCode(){
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': `${import.meta.env.VITE_RAPID_API_KEY}`,
                'x-rapidapi-host': `${import.meta.env.VITE_API_HOST}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id: langId[language],
                source_code: btoa(code),
                stdin: btoa(inputs.split(",").join("\n"))
               
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result);
            return result.token
        } catch (error) {
            console.error(error);
        }
    }


    async function getCode(token) {
        const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': `${import.meta.env.VITE_RAPID_API_KEY}`,
                'x-rapidapi-host': `${import.meta.env.VITE_API_HOST}`
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result);
            if(result.stderr){
                setResult(atob(result.stderr))
                socket.emit("outputCode", {roomName: roomName, output: atob(result.stderr)})

            }else{
                setResult(atob(result.stdout))
                socket.emit("outputCode", {roomName: roomName, output: atob(result.stdout)})
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    
    
    useEffect(()=>{
        socket.emit("shareCode", {roomName: roomName, code: code}) 
    }, [code])

    async function handleRun(){
        const token= await uploadCode()
        await getCode(token)
    }



    return(
        <div>
            <div className="pt-10 h-screen w-screen bg-[#121212] flex justify-between overflow-hidden lg:pt-5">
                <Sidebar roomName={roomName} />
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
                            onChange={(e)=>{setCode(e)}}
                            options={{
                                minimap: {enabled: false},
                                fontSize: 18
                            }}
                        />
                    </div>
                    <div className="p-4 bg-white w-full h-[20%] mt-5 overflow-scroll lg:h-[21%]">
                        Enter all inputs here as CSV format: <input 
                        className="border-2 border-red-500 w-[60%]"
                        onChange={(e)=>{setInputs(e.target.value)}}
                        type="text"/>
                        <br /><br />{result} 
                        </div>
                </div>
                <SidebarParticipants roomName={roomName} />
            </div>
        </div>
    )
}