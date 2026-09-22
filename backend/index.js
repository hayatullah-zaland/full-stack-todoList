const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const todoRoutes=require("./model/todoRoutes")

dotenv.config()
const express=require("express")


const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err)
})

app.use("/api/v1/todoes",todoRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
