import { useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";


export default function Signup(){

    const [eye, setEye] = useState("hide");
    const [passwordType, setPasswordType] = useState("password");

    function showpassword() {
        if (eye === "hide") {
            setEye("show");
            setPasswordType("text");
        } else {
            setEye("hide");
            setPasswordType("password");
        }
    }


    return (
        <div className="">
            <div className="bg-[#121212] text-white h-[100vh] w-[100vw] flex items-center justify-center gap-10 pt-10 overflow-hidden">
                <div className="hidden w-[60vw] lg:block ">
                    <video autoPlay muted loop className="rounded-lg w-[100%]">
                        <source src="src/assets/22449-327996264_large.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="w-[80vw] lg:w-[30vw] ">
                    <h2 className="text-3xl font-bold text-[#A6E22E]">Code Sphere</h2>
                    <h1 className="text-2xl font-semibold mt-3 mb-7">Hello! <br /> Welcome To Code Sphere</h1>
                    <form className="flex items-center flex-col" >
                        <p className="mb-0 text-xl">Fullname</p><br />
                            <input 
                                className="border-2 border-white p-1 w-[80%] mb-5 mt-0 "
                                type="text" name="" placeholder="Fullname"/>
                        <p className="mb-0 text-xl">Username</p><br />
                            <input 
                                className="border-2 border-white p-1 w-[80%] mb-5 mt-0 "
                                type="text" name="" placeholder="Username"/>
                        <p className="mb-0 text-xl">Password</p><br />
                        <div className="w-[80%] relative">
                            <div onClick={showpassword} className="cursor-pointer absolute top-1/5 right-5">
                            {eye==="hide"?(<FaRegEyeSlash/>):(<FaRegEye/>)}
                            </div>
                            <input 
                            className="border-2 border-white p-1 w-[100%] mb-5 mt-0 "
                             type={passwordType} name="" placeholder="Password"/>
                        </div>    
                            <input
                            className="cursor-pointer border-2 border-white p-1 w-[80%] mb-5 mt-0 font-bold text-[#A6E22E] "
                             type="submit" value="Login" name="" />

                    </form>
                    <h2 className="text-md font-medium inline">Already have an account? <h2 className="inline text-md text-sky-500 cursor-pointer">Login</h2></h2>
                    <p className="text-xl my-7 text-center">or</p>
                    <div className="w-[100%] flex justify-around">
                        <div className="cursor-pointer border-2 border-white p-2 flex justify-center items-center w-1/4">
                            <img className="w-10" src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"/></div>
                        <div className="cursor-pointer border-2 border-white p-2 flex justify-center items-center w-1/4">
                            <img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"/></div>
                        <div className="cursor-pointer border-2 border-white p-2 flex justify-center items-center w-1/4">
                            <img className="w-10" src="https://www.pngplay.com/wp-content/uploads/12/GitHub-PNG-HD-Quality.png"/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}