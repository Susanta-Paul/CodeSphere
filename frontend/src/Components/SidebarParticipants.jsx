import { useEffect, useState } from "react"
import socket from "./Socket"

export default function SidebarParticipants(props){

    const [allparticipant, setAllparticipants]=useState([
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
        {username: "user"},{username: "user"},{username: "user"},{username: "user"},
    ])

    const [message, setMessage]=useState("")

    const [allChats, setAllchats]=useState([
        {type: "you", message:"hi"},
        {type:"other", message: "Hello", username:"pikachu"},
        {type:"server", message: "Joined the Room", username:"ash"},
        {type:"other", message: "Hii", username:"ash"},
        {type:"you", message: "Chin tapak dum dum",},
    ])

    useEffect(()=>{

        socket.on("recieveMessage", (data)=>{
            setAllchats(prechat=> [...prechat, data])
        })

        return () => {
            socket.off("recieveMessage");
        };
    },[])

    function handleSendMessage(e){
        e.preventDefault()
        const msg=message
        setAllchats(prev=>[...prev, {type:"you", message: msg,}])
        setMessage("")

        socket.emit("message", {message: msg , roomName: props.roomName})
    }


    return(
        <div className="pt-7 border-3 border-white text-white h-screen lg:w-1/5 ">
            <h1 className="text-3xl text-center font-medium" >All Participants</h1>
            <div className="w-full h-[20%] mt-2 overflow-y-scroll">
                {allparticipant.map((user, index)=>(
                    <div key={index} className="flex items-center text-xl">
                        <img  
                        className="w-13 mt-5"
                        src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png"/>
                        <div>{user.username}</div>
                    </div>
                ))}
            </div><hr />
            <div className="h-[70%] flex flex-col justify-between ">
            <h1 className="text-3xl text-center font-medium my-5" >Chats</h1>
                <div className="w-full text-white border-2 border-white h-[75%] overflow-y-scroll p-2 " id="messages">
                    {allChats.map((chat, index)=>(
                        chat.type==="you"?(
                            <div key={index} className="mx-2 my-2 text-right pl-20">{chat.message}</div>
                        ):(
                            chat.type=="other"?(
                            <div key={index} className="pr-20">
                                <h3 className="mx-2 my-2 font-medium inline text-xl text-[#FF9800]">{chat.username}: </h3>
                                {chat.message}
                                </div>):(
                                    <div key={index} className="w-full flex justify-center items-center gap-2">
                                    <h3 className=" my-2 font-medium inline text-center text-lg text-[#FF9800]">{chat.username} </h3>
                                    <h3 className="my-2 font-medium inline text-center text-lg text-[#05f746]">{chat.message}</h3>
                                    </div>
                                )
                        )
                    ))}
                </div>
                <form onSubmit={(e)=>{handleSendMessage(e)}} className="flex justify-between items-center" >
                    <textarea
                    className="border-2 borer-white h-10 w-55 resize-none" name="msg"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                     placeholder="Type Message Here..."></textarea>
                    <input type="submit" value="Send"
                    className="bg-sky-500 rounded-md p-2 cursor-pointer" />
                </form>
            </div>
        </div>
    )
}