import { useEffect, useRef, useState } from "react"

export default function Reels(){

    const videos=[
        "/videos/Video-332.mp4",
        "/videos/Video-888.mp4",
        "/videos/Video-19.mp4",
        "/videos/AQMyAYWEPk3uV1eQrtIA71xXHNKxARrx53wDU__bbki2AearcYdFvevch4ku4dv-_4SUR_NWWiCSykmTD8Bdm-O4WvYQUIlPIoA8cvQ.mp4",
        "/videos/AQMde5nWeYAoFfIjuOeQlQO3tO869MEsr0MvLmsMPY-yAk0N9oEbHSg1DFa1L8WzWJwL3sDso6rbJhAVWnOQiH6Bqe0UXCnHggJ2m_0.mp4",
        "/videos/Video-171.mp4",
        "/videos/Video-255.mp4",
        "/videos/Video-523.mp4",
        "/videos/Video-743.mp4",
        "/videos/Video-744.mp4",
        "/videos/Video-788.mp4",
        "/videos/Video-873.mp4",
        "/videos/newvdo.mp4",
        "/videos/new2.mp4",

    ]

    const videoRefs=useRef([])
    const [active, setActive]=useState(0)


    useEffect(()=>{
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              const index = videoRefs.current.findIndex(video => video === entry.target)
              if (entry.isIntersecting) {
                setActive(index)
              }
            })
          }, { root: null, rootMargin: "0px", threshold: 0.8 })

        videoRefs.current.forEach((video)=>{
            if(video){observer.observe(video)}
        });

        return ()=>{
            videoRefs.current.forEach((video)=>{
                if(video){
                    observer.unobserve(video)
                    video.pause()
                }
            })
        }
    },[])

    


    useEffect(()=>{
        videoRefs.current.forEach((video, index)=>{
            if(index===active){
                video.play()
            }else{
                video.pause()
                video.currentTime=0
            }
        })
    },[active])

    const reel=useRef(null)

    useEffect(()=>{
        function handleReelScroll(event){
            if(event.key==="ArrowDown"){
                reel.current.scrollIntoView({behavior: "smooth"})
            }
        }

        window.addEventListener("keydown", handleReelScroll)

        return ()=>{
            window.removeEventListener("keydown", handleReelScroll)
        }

    },[])

    function handlePlay(index){
        if(videoRefs.current[index].paused){
            videoRefs.current[index].play()
        }else{
            videoRefs.current[index].pause()
        }
    }


    return (
        <div ref={reel} className=" cursor-pointer snap-y snap-mandatory scroll-smooth border-4 border-white h-full w-full flex flex-col overflow-y-scroll gap-7 ">
            {videos.map((video, index)=>(
                <video key={index}
                className="mt-5 snap-center"
                src={video}  loop 
                ref={el => videoRefs.current[index] = el}
                onClick={()=>{handlePlay(index)}}
                ></video>
            ))}
        </div>
    )
}