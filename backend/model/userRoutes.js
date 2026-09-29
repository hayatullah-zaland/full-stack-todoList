const express = require("express");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const {User} = require("../schemas")

const router = express.Router();

router.post("/register", async (req, res) => {

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      
      const newUser = await user.save();
      const token=jwt.sign({_id:newUser._id},"thisismysecrate")
      console.log(token);

      res.status(201).json({user:newUser,token},);

      
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
});

router.get("/getuser", async (req, res) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    const decodedToken = jwt.verify(
      token,
      "thisismysecrate"
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.log("Get User Error:", error.message);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});

router.post("/login",async(req,res)=>{
  User.findOne({email:req.body.email}).then((user)=>{
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    bcrypt.compare(req.body.password,user.password).then((isMatch)=>{
      if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"})
      }
      const token=jwt.sign({_id:user._id},process.env.JWTSECRATE)
      res.json({token,user})
    })
  })
})

module.exports = router;