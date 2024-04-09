import axios from "axios";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

// It handles Register user.
export const register = async (params: RegisterProps) => {
  const { firstName, lastName, email, password } = params;

  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/register",
      {
        firstName,
        lastName,
        email,
        password,
        username: `@${firstName.toLocaleLowerCase()}${lastName.toLocaleLowerCase()}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.error || "Failed to Register");
  }
};

// It handles user login
export const login = async (params: LoginProps) => {
  const { email, password } = params;
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.error || "Failed to Login");
  }
};

// It handles user search history
export const addUserSearchHistory = async (
  user_id: string,
  video_id: string
) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/user/search_history",
      { user_id, video_id }
    );
    return data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.error || "Failed to add search history"
    );
  }
};

// It removes search history
export const removeUserSearchHistory = async (
  user_id: string,
  video_id: string
) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/user/search_history?user_id=${user_id}&video_id=${video_id}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Failed to remove search history"
    );
  }
};
