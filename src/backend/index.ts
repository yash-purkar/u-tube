const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/user");
const checkIsEmailValid = require("./serverHandlers/serverHandlers");

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
  // finding user in db.
  const user = await User.findOne({ email: body.email });
  const newUser = new User({ ...body });

  if (!checkIsEmailValid(body.email)) {
    return res.status(400).send({ error: "Invalid EmailID🙁" });
  }

  // If password length is less than equal to 6 throw an error.
  if (body.password.length <= 6) {
    return res
      .status(400)
      .send({ error: "Password must be greater than 6 characters." });
  }

  // If user email is already there throw an error
  if (user) {
    return res.status(409).send({ error: "User already exist" });
  }

  // saving user in db
  const addedUser = await newUser.save();

  return res.status(201).send({ message: "Success", user: addedUser });
});

app.post("/login", async (req: any, res: any) => {
  const body = req.body;

  const user = await User.findOne({
    email: body.email,
    password: body.password,
  });
  if (user) {
    return res.status(201).send({ message: "Success", user });
  }

  return res.status(404).send({ error: "Wrong Credentials🙁" });
});

// Running server on particular port
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});
