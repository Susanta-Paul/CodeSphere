const {validationResult}=require("express-validator")
const userModel=require("../models/user.models")
const brypt=require("bcryptjs")
const userService=require("../services/user.services")


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

    const isMatch=user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message: "Invalid Username or password"})
    }

    const token=user.generateAuthToken()

    res.cookie("token", token)

    return res.status(200).json({token, user})
}


module.exports.userSignupController= async (req, res, next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors})
    }

    const {fullname, username, email, password}=req.body

    const hashedPassword=userModel.hashPassword(password)

    try{
        const user=await userService.createUserService({
            fullname, username, email, password:hashedPassword
        }) 

        const token=user.generateAuthToken()

        res.cookie("token", token)

        return res.status(200).json({token, user})

    }catch(error){
        return res.status(400).json({error})
    }
    
}