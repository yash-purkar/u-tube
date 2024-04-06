import { Request } from "express";

// User types
export interface UserRegisterRequest extends Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginRequest extends Request {
  email: string;
  password: string;
}

// Filter types
export interface AddFilterRequest extends Request {
  name: string;
  slug: string;
}
