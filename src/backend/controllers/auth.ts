const User = require("../models/user");
const checkIsEmailValid = require("../serverHandlers/serverHandlers");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import {  Response } from "express";
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
        error: "User already exist",
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

    return res.status(201).send({ message: "Success", user: addedUser });
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
    }).select("+password");

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
        { user_id: user?._id },
        process.env.JSON_TOKEN_SECERET,
        { expiresIn: "1d" }
      );
      res.cookie("token", token);

      return res.status(201).json({ message: "Success" });
    }
    //   Else return message user not found
    return res.status(404).json({ error: "User not found🙁" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// It checks is user is authenticated or not
export const checkIsAuthenticated = async (req: any, res: any) => {
  try {
    // we've set the user_id in checkAuth middleware
    const user = await User.findOne({ _id: req?.user_id });

    if (user) {
      res.status(200).send({ Success: true, user });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal server error" });
  }
};
