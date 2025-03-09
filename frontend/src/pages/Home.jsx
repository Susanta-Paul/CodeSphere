import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home(){

    const [user, setUser]=useState({
        fullname: "fdsfsdfsdft", 
        username: "fasdfsdffsdf"
    })
    const navigate=useNavigate()

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
        
            setUser({
                fullname: res.user.fullname,
                username: res.user.username
            })
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
            }
        }catch(err){}
    }


    return(
        <div>
            <div className="h-screen w-screen bg-[#121212] text-white ">
                <div className="flex justify-around items-center">
                    <div className="flex gap-7 items-center p-7">
                        <div className="h-30 w-30 rounded-full overflow-hidden">
                        <img src="https://sabimages.com/wp-content/uploads/2024/07/cute-girl-pic-photo4.jpg" alt="Profile picture"
                            className="w-[100%] "
                        /></div>
                        <div className="flex flex-col" >
                        <h1 className="text-3xl font-medium">{user.username}</h1>
                        <h3 className="text-xl font-small"> {user.fullname} </h3></div>
                    </div>
                    <div onClick={handleLogout} ><button className="text-white bg-red-500 p-2 text-xl font-bold rounded-lg cursor-pointer">Logout</button></div>
                </div>
                <div className="flex justify-center flex-col gap-7 pr-7">
                    <button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Join Room</button>
                    <button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Create Room</button>
                </div>
            </div>
        </div>
    )
}