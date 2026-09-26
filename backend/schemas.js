
const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv")
dotenv.config()

const app=express()
app.use(express.json()) 

const todoSchema=new mongoose.Schema({
    title:{
            type:String,
            required:true
    },
    description:{
        type:String,
        required:false
},
 completed: { type: Boolean, default: false }, 
 category: {
    type: String,
    enum: ["Work", "Personal", "Shopping", "Study"],
    default: ""
  }
},{timestamps:true})    

const Todo=mongoose.model("Todo",todoSchema)
module.exports=Todo