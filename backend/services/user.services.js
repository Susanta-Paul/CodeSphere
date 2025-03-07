const userModel=require("../models/user.models")


module.exports.createUserService=async ({fullname, username, email, password}){
    if(!fullname || !username || !email || !password){
        throw new Error("All Credential are required")
    }

    try{
        const user=await userModel.create({
            fullname, 
            username, 
            email,
            password
        })

        return user;

    }catch(err){return err}
    
    
}