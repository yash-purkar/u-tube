"use client";
import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from "./login.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/navigation";

interface UserDetails {
  email: string;
  password: string;
}

const useStyles: () => any = makeStyles({
  login_container: {
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
  login_button: {
    backgroundColor: "#1976d20a",
  },
});

export const Login = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
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

  //   Navigate to signup page
  const handleNavigateToSignup = () => {
    router.replace("/signup");
  };

  //   button disabled condition
  const isButtonDisabled = userDetails.email && userDetails.password;

  return (
    <Container maxWidth="sm">
      <Box component={"form"} className={classes.login_container}>
        <div className={styles.login_header}>
          <YouTubeIcon className={classes.brand_icon} />
          <Typography variant="h6">Login</Typography>
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
          className={classes.login_button}
          variant="outlined"
          disabled={!isButtonDisabled}
        >
          Login
        </Button>
        <Button
          onClick={handleNavigateToSignup}
        >{`Don't have an Account?`}</Button>
      </Box>
    </Container>
  );
};
