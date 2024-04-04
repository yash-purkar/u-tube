import express from "express";
import { checkIsAuthenticated, login, register } from "../controllers/auth";
import { checkAuth } from "../middlewares/middlewares";
const router = express.Router();

// register user
router.post("/register", register);

// login user
router.post("/login",login);

// check auth
router.get("/checkAuth", checkAuth, checkIsAuthenticated);

export default router;
