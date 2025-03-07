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
    socketId: {
        type: String,
        unique: true,
        required: false,
        sparse: true
    }
})
userSchema.statics.hashPassword=async (password)=>{
    return await bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword= async (password)=>{
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAuthToken= ()=>{
    const token= jwt.sign({username: this.username}, process.env.SECRET_KEY, { expiresIn: '24h' })
    return token
}


const user=mongoose.model("Users", userSchema)

mongoose.exports=user