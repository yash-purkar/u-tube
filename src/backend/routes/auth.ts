import express, { Router} from "express";
import { checkIsAuthenticated, login, register } from "../controllers/auth";
import { checkAuth } from "../middlewares/middlewares";
import { UserLoginRequest, UserRegisterRequest } from "../types";

const router: Router = express.Router();

// register user
router.post("/register", async (req, res) => {
  await register(req as UserRegisterRequest, res);
});

// login user
router.post("/login", async (req,res) => {
    await login(req as UserLoginRequest, res);
});

// check auth
router.get("/checkAuth", checkAuth, checkIsAuthenticated);

export default router;
