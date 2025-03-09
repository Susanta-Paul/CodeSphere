const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength:[4, "Username must be atleast 4 character long"]
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        minlength:[4, "Username must be atleast 4 character long"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [13, "Email must be atleast 13 character long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    refreshToken: {
        type: String,
        required: false,
        unique: true,
        select: false,
        sparse: true
    },
    socketId: {
        type: String,
        unique: true,
        required: false,
        sparse: true
    }
})
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken= function(){
    const accessToken= jwt.sign({username: this.username}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '24h' })
    return accessToken
}
userSchema.methods.generateRefreshToken=function(){
    const refresh= jwt.sign({username: this.username}, process.env.REFRESH_TOKEN_SECRET_KEY)
    return refresh
}
userSchema.statics.hashPassword=async (password)=>{
    return await bcrypt.hash(password, 10)
}


const userModel=mongoose.model("Users", userSchema)

module.exports=userModel