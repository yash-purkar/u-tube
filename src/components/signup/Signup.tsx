"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from "./signup.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/navigation";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const useStyles: () => any = makeStyles({
  signup_container: {
    marginTop: "2rem",
    padding: "5rem 3rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  brand_icon: {
    color: "red",
  },
  signup_button: {
    backgroundColor: "#1976d20a",
  },
});

export const SignUp = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const classes = useStyles();
  const router = useRouter();

  //   It handles the change of input fields.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(userDetails);
  };

  //   Navigate to login page
  const handleNavigateToLogin = () => {
    router.replace("/login");
  };

//   button disabled condition
  const isButtonDisabled = userDetails.firstName && userDetails.lastName && userDetails.email && userDetails.password

  return (
    <Container maxWidth="sm">
      <Box component={"form"} className={classes.signup_container}>
        <div className={styles.signup_header}>
          <YouTubeIcon className={classes.brand_icon} />
          <Typography variant="h6">Create New Account</Typography>
        </div>
        <div className={styles.user_name_lastName}>
          <TextField
            size="small"
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            value={userDetails.firstName}
            name="firstName"
            required
          />
          <TextField
            size="small"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            value={userDetails.lastName}
            name="lastName"
            required
          />
        </div>
        <TextField
          size="small"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={userDetails.email}
          name="email"
          required
        />
        <TextField
          size="small"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={userDetails.password}
          name="password"
          required
        />
        <Button
          onClick={handleSubmit}
          className={classes.signup_button}
          variant="outlined"
          disabled={!isButtonDisabled}
        >
          Create
        </Button>
        <Button onClick={handleNavigateToLogin}>
          Already have an Account?
        </Button>
      </Box>
    </Container>
  );
};
