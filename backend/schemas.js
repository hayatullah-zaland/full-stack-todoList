const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv")
const { required } = require("joi")
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

const usersSchema=new mongoose.Schema({
        name:{
                type:String ,
                required:["name is requird",true]
        },
        email:{
        type:String,
        required:["email is required",true]
        },
        password:{
                type:String,
                required:["password is required",true]
        }
})

const User=mongoose.model("User",usersSchema)
const Todo=mongoose.model("Todo",todoSchema)
module.exports={Todo,User}