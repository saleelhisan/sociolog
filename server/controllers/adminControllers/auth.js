import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../../models/admin.js";
export const login = async(req,res) =>{
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;



    try{
        const {email,password} = req.body;
        const admin = (email === adminUsername) ? true : false;

        const msg = "Please enter correct email address"
        
        if(!admin)  return res.status(400).json({msg})
    
        const isMatch = (password === adminPassword) ? true : false;
    
        if(!isMatch)   return res.status(400).json({msg:"Incorrect Password entered"})
         
        const token = jwt.sign({is: admin._id},process.env.JWT_SECRET)
    
        delete admin.password 

        console.log(token,admin);
    
        res.status(200).json({token,admin});
    }
    catch (err){
        res.status(500).json({msg : "Something went wrong in login "})
    }
    

}