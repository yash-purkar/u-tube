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

// User types
export interface AddUserSearchHistoryRequest extends Request {
  user_id: string;
  video_id: string;
}

export interface UserSearchHistoryRemoveRequest extends Request {
  user_id: string;
  video_id: string;
}

// Videos types
export interface VideoDetailsRequest extends Request {
  vid_id: string;
}

// comment types
export interface AddCommentRequest extends Request {
  user: string;
  video: string;
  content: string;
}
