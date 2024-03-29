const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/user");
const checkIsEmailValid = require("./serverHandlers/serverHandlers");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Filter = require("./models/filter");

dotenv.config();

const app = express();

// Convert incoming request to json, and make it available in req.body
app.use(express.json());

// Allows requests from anywhere
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// It parse incoming cookie data from HTTP request and make it accessable in req.cookies
app.use(cookieParser());

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI);

app.post("/register", async (req: any, res: any) => {
  const body = req.body;
  // finding user in db.
  const user = await User.findOne({ email: body.email });
  const newUser = new User({
    ...body,
    username: `@${body.firstName.concat(body.lastName).toLowerCase()}`,
  });

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
    const token = jwt.sign(
      { email: body.email },
      process.env.JSON_TOKEN_SECERET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token);

    return res.status(201).json({ message: "Success", user });
  }

  return res.status(404).json({ error: "Wrong Credentials🙁" });
});

// Middleware to check token
const checkAuth = (req: any, res: any, next: () => {}) => {
  const token = req?.cookies?.token;

  if (token) {
    // decoding token
    const decoded = jwt.decode(token);
    // setting email in request to find the user in callback of /checkAuth endpoint.
    req.userEmail = decoded?.email;
    return next();
  }

  return res.status(200).send({ Success: false });
};

// This endpoint checks is user Authenticated or not
app.get("/checkAuth", checkAuth, async (req: any, res: any) => {
  const user = await User.findOne({ email: req?.userEmail });

  res.status(200).send({ Success: true, user });
});

app.post("/filter/add", async (req: Request, res: any) => {
  const body = req.body;
  const newFilter = new Filter(body);
  await newFilter.save();
  return res.status(200).send({ message: "Added" });
});

// Running server on particular port
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});
