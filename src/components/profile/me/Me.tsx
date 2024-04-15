"use client";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Box, Container, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import delete_this_image_later from "../../../../public/assets/delete_later.jpg";
import { makeStyles } from "@mui/styles";
import styles from "./me.module.css";
import UserVideos from "../userVideos/UserVideos";

const useStyles: () => any = makeStyles((theme:any)=>({
  inner_container: {
    padding:'2rem',
    margin: '3rem 0rem 0rem',
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    gap: "1rem",
    boxShadow:'none',
    '@media (min-width: 720px)': {
      flexDirection:'row'
    }
  },
  profile_picture: {
    borderRadius: "50%",
  },
}));

export const Me = () => {
  const { user } = useAppSelector((state) => state.user);
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Paper className={classes.inner_container} >
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
                <p>{user?.subscribers} subscriber{user?.subscribers !== 1 &&<span>s</span>}</p>
              </div>
            </Box>
        </Paper>
      <UserVideos/>
      </Container>
    </div>
  );
};
