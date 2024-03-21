"use client";
import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { SideDrawer } from "./components/SideDrawer";

const useStyles: () => any = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  brand_header: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
  },
  brand_button: {
    padding: "0px",
  },
  brand_icon: {
    color: "red",
  },
  title: {
    fontWeight: "bold",
  },
  profile_icon: {
    flexGrow: 1,
  },
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <div className={classes.brand_header}>
          <SideDrawer>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </SideDrawer>

          <IconButton className={classes.brand_button}>
            <YouTubeIcon className={classes.brand_icon} />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            UTube
          </Typography>
        </div>

        <div>
          <Avatar
            alt="Y"
            className={classes.profile_icon}
            src="url"
            sx={{ width: "30px", height: "30px" }}
          />
        </div>
      </Toolbar>

      <Divider />
    </>
  );
};
