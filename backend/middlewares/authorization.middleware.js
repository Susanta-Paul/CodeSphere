const jwt=require("jsonwebtoken")



module.exports.userAuthentication= async (req, res, next)=>{
 
    const token=req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({message: "Authentication required"})
    }

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.username=decoded.username
    }catch(err){
        return res.status(401).json({message: "token has expired"})
    }
    
    next()
}