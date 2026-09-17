const express=require("express")
const Todo=require("./schemas")

const app=express()
app.use(express.json())

const postTodo=("/api/v1/post",async(req,res)=>{
    try{
        const {title,description}=req.body
        const todo=await Todo.create({title,description})
        res.status(201).json(todo)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

module.exports=postTodo