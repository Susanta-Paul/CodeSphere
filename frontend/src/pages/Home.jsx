import { useEffect, useState } from "react"
import {NavLink, useNavigate } from "react-router-dom"
import socket from "../Components/Socket"
import RenewAccessToken from "../Components/RenewAccessToken"

export default function Home(){

    const [user, setUser]=useState({
        fullname: "", 
        username: ""
    })
    const navigate=useNavigate()


    useEffect(()=>{

        const refreshToken = localStorage.getItem("refreshToken");

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

    useEffect(()=>{

        async function fetchData(){
            const response= await fetch(`${import.meta.env.VITE_BASE_URL}/users/getprofile`, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                },
                credentials: 'include'
            })

            const res= await response.json()

            if(response.status==200){
                setUser({
                    fullname: res.user.fullname,
                    username: res.user.username
                })
            }else if(response.status==401){
                RenewAccessToken()
            }
            
        }

        fetchData()

    }, [])


    async function handleLogout() {
        try{
            const response= await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                },
                credentials: "include",
                
            })

            const res=await response.json()

            if(response.status==200){
                console.log(res.message)
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                navigate("/login")
            }else if(response.status==401){
                RenewAccessToken()
            }
        }catch(err){}
    }


    return(
        <div>
            <div className="h-screen w-screen bg-[#121212] text-white ">
                <div className="flex justify-around items-center">
                    <div className="flex gap-7 items-center p-7">
                        <div className="h-30 w-30 rounded-full overflow-hidden">
                        <img src="https://photosbook.in/wp-content/uploads/cute-girl-pic11.jpg"
                            className="w-[100%] "
                        /></div>
                        <div className="flex flex-col" >
                        <h1 className="text-3xl font-medium">{user.username}</h1>
                        <h3 className="text-xl font-small"> {user.fullname} </h3></div>
                    </div>
                    <div onClick={handleLogout} ><button className="text-white bg-red-500 p-2 text-xl font-bold rounded-lg cursor-pointer">Logout</button></div>
                </div>
                <div className="flex justify-center flex-col gap-7 pr-7">
                    <NavLink to="/join"><button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Join Room</button></NavLink>
                    <NavLink to="/create"><button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Create Room</button></NavLink>
                </div>
            </div>
        </div>
    )
}