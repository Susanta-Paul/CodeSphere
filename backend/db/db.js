const mongoose=require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connect Successfully ")
    })
}

module.exports=connectToDb