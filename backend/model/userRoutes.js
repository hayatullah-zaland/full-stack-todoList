const express = require("express");
const bcrypt = require("bcrypt");
const {User} = require("../schemas")

const router = express.Router();

router.post("/register", async (req, res) => {

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    console.log(hashedPassword);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;