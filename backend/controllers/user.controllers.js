const {validationResult}=require("express-validator")
const userModel =require("../models/user.models")
const userService=require("../services/user.services")
const jwt=require("jsonwebtoken")


async function generateAccessAndRefreshToken(userId){
    const newUser= await userModel.findById(userId)

    const accessToken= newUser.generateAccessToken()
    const refreshToken= newUser.generateRefreshToken()

    return {accessToken, refreshToken}
}


module.exports.userLoginController= async (req, res, next)=>{
    
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const {username, password}=req.body

    const user= await userModel.findOne({username: username}).select("+password")

    if (!user){
        return res.status(401).json({message: "Invalid Username or password"})
    }
    
    const isMatch= await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message: "Invalid Username or password"})
    }

    const options={
        httpOnly: true,
        secure:true
    }

    const {accessToken, refreshToken}= await generateAccessAndRefreshToken(user._id)


    try{
        const newUser=await userModel.findByIdAndUpdate(user._id, {refreshToken: refreshToken})
        res.cookie("accessToken", accessToken,options).cookie("refreshToken", refreshToken,options)

        return res.status(200).json({
            "accessToken": accessToken,
            "refreshToken": refreshToken,
            "newuser": newUser
        })
    }catch(error){
        return res.status(500).json({error})
    }
    
}


module.exports.userSignupController= async (req, res, next)=>{

    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors})
    }

    const {fullname, username, email, password}=req.body

    const hashedPassword= await userModel.hashPassword(password)

    try{
        const user=await userService.createUserService({
            fullname, username, email, password:hashedPassword
        }) 

        const {accessToken, refreshToken} =await generateAccessAndRefreshToken(user._id)

        const options={
            httpOnly: true,
            secure: true
        }

        res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)

        const sendUser= await userModel.findByIdAndUpdate(user._id, {refreshToken: refreshToken});

        
        return res.status(200).json({accessToken, refreshToken, sendUser}) 

    }catch(error){
        return res.status(400).json({error, message: "something went wrong during creating the user"})
    }
    
}


module.exports.getUserProfileController=async (req, res, next)=>{

    try{
        const user=await userModel.findOne({username: req.username})
        res.status(200).json({user})

    }catch(error){
        return res.status(500).json({error})
    }
}
module.exports.userLogoutController=async (req, res, next)=>{

    try{
        await userModel.findOneAndUpdate(
            {username: req.username},
            {$set: {refreshToken: null}}
        )

        const options={
            httpOnly: true,
            secure:true
        }

        res.clearCookie("accessToken", options).clearCookie("refreshToken", options)

        res.status(200).json({message: "User Successfully Loggedout"})

    }catch(error){
        return res.status(500).json({error})
    }
}

module.exports.renewAccessTokenController= async(req, res, next)=>{
    const incommingToken=req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1]

    if(!incommingToken){
        return res.status(401).json({message: "unauthorized request"})
    }

    try{
        const decoded=jwt.verify(incommingToken, process.env.REFRESH_TOKEN_SECRET_KEY)

        const user= await userModel.findOne({username: decoded?.username})

        if(!user){
            return res.status(401).json({message: "invalid refresh Token"})
        }

        if(user?.refreshToken!==incommingToken){
            return res.status(401).json({message: "Token is Expired or been Used"})
        }

        const {accessToken, refreshToken}=await generateAccessAndRefreshToken(user?._id)
        
        const options={
            httpOnly: true,
            secure:true
        }

        await userModel.findByIdAndUpdate(user?._id, {refreshToken: refreshToken})

        res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)

        res.status(200).json({accessToken, refreshToken})
    }catch(error){
        res.status(500).json({error})
    }
}