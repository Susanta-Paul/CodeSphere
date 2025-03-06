const express=require("express")
const router=express.Router()
const userController=require("../controllers/user.controllers")
const {body} =require("express-validator")

router.post("/login",[
    body("username").trim().isLength({min: 4}).withMessage("Username must be atleast 4 character long"),
    body("password").isLength({min: 6}).withMessage("Password must be atleast 6 character long")
], userController.userLoginController)

router.post("/signup",[
    body("username").trim().isLength({min: 4}).withMessage("Username must be atleast 4 character long"),
    body("email").isEmail().isLength({min: 13}).withMessage("Email must be atleast 13 character long"),
    body("password").isLength({min: 6}).withMessage("Password must be atleast 6 character long"),
    body("fullname").isLength({min: 4}).withMessage("Fullname must be atleast 4 character long"),
],userController.userSignupController) // implement that controller :)



module.exports=router