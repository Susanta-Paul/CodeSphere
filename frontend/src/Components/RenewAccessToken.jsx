export default async function RenewAccessToken(){
    
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/renewaccesstoken`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${localStorage.getItem("refreshToken")}`
            },
            credentials: "include"
        })

        const res=await response.json()
        if(response.status==200){
            localStorage.setItem("accessToken", res.accessToken)
            localStorage.setItem("refreshToken", res.refreshToken)
        }
        if(response.status==401){
            console.log(res)
        }
    }catch(err){console.log(err)}
}