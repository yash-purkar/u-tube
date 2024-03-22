import axios from "axios";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// It handles Register user.
export const register = async (params: RegisterProps) => {
  const { firstName, lastName, email, password } = params;

  try {
    const { data } = await axios.post(
      "http://localhost:3001/register",
      {
        firstName,
        lastName,
        email,
        password,
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
