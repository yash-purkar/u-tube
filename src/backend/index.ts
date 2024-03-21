const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const app = express();

// Convert incoming request to json, and make it available in req.body
app.use(express.json());

// Allows requests from anywhere
app.use(cors());

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI);

app.post("/register", async (req: any, res: any) => {
  const body = req.body;

  const user = await User.findOne({ email: body.email });
  const newUser = new User({ ...body });

  if (user) {
    return res.status(409).send({ error: "User already exist" });
  }
  const addedUser = await newUser.save();

  return res.send({ message: "Success", user:  addedUser });
});

app.post("/login",async(req:any,res:any) => {
    const body = req.body;

    const user = await User.findOne({email:body.email});
    if(user) {
        return res.status(201).send({message:"Success",user});
    }

    return res.status(404).send({error:"User not found"})
})

// Running server on particular port
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});
