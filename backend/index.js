const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
dotenv.config()
const express=require("express")
const Todo=require("./schemas")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err)
})

app.post("/api/v1/post/:id",async(req,res)=>{
    try{
        const {title,description,time}=req.body
        const todo=await Todo.create({title,description,time})
        res.status(201).json(todo)
        await todo.save()
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

app.get("/api/v1/get",async(req,res)=>{
    const getPost=await Todo.find()
    res.send(getPost)
    await getPost.save()
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
