"use client";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Box, Container, Paper } from "@mui/material";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import delete_this_image_later from "../../../public/assets/delete_later.jpg";
import { makeStyles } from "@mui/styles";
import styles from "./profile.module.css";
import UserVideos from "./userVideos/UserVideos";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/clientHandlers/userHandlers";

interface ProfileProps {
  username: string;
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

export const Profile: FC<ProfileProps> = ({ username }) => {
  const classes = useStyles();

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      return getUserDetails(username);
    },
  });

  return (
    <div>
      <Container>
        <Paper className={classes.inner_container}>
          <Box>
            <Image
              src={
                "https://static.vecteezy.com/system/resources/previews/005/129/844/large_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              }
              width={150}
              height={150}
              alt="img"
              className={classes.profile_picture}
            />
          </Box>
          <Box>
            <h2>
              {data?.user?.firstName} {data?.user?.lastName}
            </h2>
            <div className={styles.user_extra_info}>
              <p>{data?.user?.username}</p>
              <span>.</span>
              <p>
                {data?.user?.subscribers?.length} subscriber
                {data?.user?.subscribers?.length !== 1 && <span>s</span>}
              </p>
            </div>
          </Box>
        </Paper>
        <UserVideos user_id={data?.user?._id as string} />
      </Container>
    </div>
  );
};
