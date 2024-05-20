const User = require("../models/user");
const checkIsEmailValid = require("../serverHandlers/serverHandlers");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserLoginRequest, UserRegisterRequest } from "../types";

// Register user controller
export const register = async (req: UserRegisterRequest, res: Response) => {
  try {
    const body = req.body as UserRegisterRequest;

    //searching user in DB
    const user = await User.findOne({ email: body?.email });

    // If user's email is already exist throw an error.

    if (user) {
      return res.status(409).send({
        error: "User already exist with this email!",
      });
    }

    const newUser = new User({
      ...body,
      username: `@${body.firstName.concat(body.lastName).toLowerCase()}`,
    });

    if (!checkIsEmailValid(body.email)) {
      return res.status(400).send({ error: "Invalid Email🙁" });
    }

    //   If password length is less than or equal to 6 throw an error.
    if (body?.password?.length <= 6) {
      return res
        .status(400)
        .send({ error: "Password must be greater than 6 characters." });
    }

    //   saving user in DB
    const addedUser = await newUser.save();

    return res
      .status(201)
      .send({ Success: true, message: "Registered Succesfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// Login user controller
export const login = async (req: UserLoginRequest, res: any) => {
  try {
    const body = req.body;

    // Searching for user
    const user = await User.findOne({
      email: body.email,
    }).select("+password email username");

    if (user) {
      // Checks password is correct or not
      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        user?.password
      );

      if (!isPasswordCorrect) {
        return res.status(404).json({ error: "Wrong Password🙁" });
      }

      // If password is correct generate token and add user_id in it
      const token = jwt.sign(
        { user_id: user?._id, email: user?.email, username: user?.username },
        process.env.JSON_TOKEN_SECERET,
        { expiresIn: "1d" }
      );
      res.cookie("token", token);

      //Convert mongoose document to plain javaScript object.
      const userObj = user?.toObject();

      // Removing password field from user object, bcz we don't wanna send it to the browser
      const { password, ...userFieldsWithoutPassword } = userObj;

      return res.status(201).json({ Success: true, user:userFieldsWithoutPassword });
    }

    //   Else return message user not found
    return res.status(404).json({ Success: false, error: "User not found🙁" });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It checks is user is authenticated or not
export const checkIsAuthenticated = async (req: any, res: any) => {
  try {
    // we've set the user_id in checkAuth middleware
    const user = await User.findOne({ _id: req?.user_id }).select(
      "search_history firstName lastName username subscribers watch_later_videos"
    );

    if (user) {
      res.status(200).send({ Success: true, user });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal server error" });
  }
};

// It checks is token valid for protected routes
export const checkIsTokenValid = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    // decoding token to find user
    const decoded = jwt.decode(query.token);

    const user = await User.findOne({
      _id: decoded?.user_id,
      email: decoded?.email,
      username: decoded?.username,
    });

    if (query.token) {
      if (user) {
        return res
          .status(200)
          .send({ Success: true, message: "User Exist in DB" });
      } else {
        return res.status(500).send({
          Success: false,
          message: "Heyy buddy, you have entered wrong information in token",
        });
      }
    } else {
      return res.status(500).send({
        Success: false,
        message: "Please login first",
      });
    }
  } catch (error) {
    res.status(500).send({ Success: false, message: "Internal Server Error" });
  }
};
