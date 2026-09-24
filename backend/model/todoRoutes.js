const express = require("express");
const router = express.Router();

const Todo=require("../schemas")


router.get("/",async(req,res)=>{
    const getPost=await Todo.find().sort({title:-1})
    res.send(getPost)
    await getPost.save()
})


router.post("/",async(req,res)=>{
    const todo=new Todo({
        title:req.body.title,
        description:req.body.description
    })
    try{
        const newTodo=await todo.save()
        res.status(201).json(newTodo)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
          return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

router.put("/:id", async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports=router