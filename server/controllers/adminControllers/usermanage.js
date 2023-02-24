import User from "../../models/User.js"

import mongoose from "mongoose";
import { response } from "express";
const ObjectId = mongoose.Types.ObjectId;   
export const getallUsers = async (req, res) => {



    try {
        const allusers = await User.find()
        if (allusers) {
            return res.status(200).json(allusers)
        }
        else {
            const message = "Users not found"
            return res.status(404).json({ message })
        }

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const blockuser = (req, res) => {
    const { id } = req.params;
    const checked = req.body.checked;
    if(checked){
        User.updateOne({_id:ObjectId(id)}, { isBlocked: false } ).then((response)=>{
            return res.status(200).json({isBlocked:false})
        })
    }else{
        User.updateOne({_id:ObjectId(id)}, { isBlocked: true } ).then((response)=>{
            return res.status(200).json({isBlocked:true})
        })


        // return res.status(200).json({isBlocked:true})

    }
    
  }