"use client";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Box, Container, Paper } from "@mui/material";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import delete_this_image_later from "../../../public/assets/delete_later.jpg";
import { makeStyles } from "@mui/styles";
import styles from "./profile.module.css";
import UserVideos from "./userVideos/UserVideos";

interface ProfileProps {
  user: {
    _id:string;
    firstName: string;
    lastName: string;
    username: string;
    subscribers: string[];
  };
}

const useStyles: () => any = makeStyles((theme: any) => ({
  inner_container: {
    padding: "2rem",
    margin: "3rem 0rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "none",
    "@media (min-width: 720px)": {
      flexDirection: "row",
    },
  },
  profile_picture: {
    borderRadius: "50%",
  },
}));

export const Profile: FC<ProfileProps> = ({ user }) => {
  const classes = useStyles();
  console.log(user);
  return (
    <div>
      <Container>
        <Paper className={classes.inner_container}>
          <Box>
            <Image
              src={delete_this_image_later}
              width={150}
              height={150}
              alt="img"
              className={classes.profile_picture}
            />
          </Box>
          <Box>
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>
            <div className={styles.user_extra_info}>
              <p>{user?.username}</p>
              <span>.</span>
              <p>
                {user?.subscribers?.length} subscriber
                {user?.subscribers?.length !== 1 && <span>s</span>}
              </p>
            </div>
          </Box>
        </Paper>
        <UserVideos user_id={user?._id as string} />
      </Container>
    </div>
  );
};
