
const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv")
dotenv.config()

const app=express()
app.use(express.json()) 

const todoSchema=new mongoose.Schema({
    title:{
        type:{
            type:String,
            required:true
        }
    },
    description:{
        type:String,
        required:false
}
},{timestamps:true})    

const Todo=mongoose.model("Todo",todoSchema)
module.exports=Todo