import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function UserProtected({children}){

    const token= localStorage.getItem("refreshToken")
    const navigate=useNavigate()
    
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    }, [token])

    if(!token){
        return 
    }


    return (
        <>
            {children}
        </>
    )
}