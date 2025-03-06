export default function Home(){
    return(
        <div>
            <div className="h-screen w-screen bg-[#121212] text-white ">
                <div className="flex gap-7 items-center p-7">
                    <div className="h-30 w-30 rounded-full overflow-hidden">
                    <img src="https://sabimages.com/wp-content/uploads/2024/07/cute-girl-pic-photo4.jpg" alt="Profile picture"
                        className="w-[100%] "
                     /></div>
                    <h1 className="text-3xl font-medium">Susanta Paul</h1>
                </div>
                <div className="flex justify-center flex-col gap-7 pr-7">
                    <button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Join Room</button>
                    <button className="bg-sky-500 ml-10 cursor-pointer border-2 border-white font-bold p-2 ">Create Room</button>
                </div>
            </div>
        </div>
    )
}