"use client";
import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { SideDrawer } from "./components/SideDrawer";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import Filters from "../home/Filters";
import CloseIcon from "@mui/icons-material/Close";

const useStyles: () => any = makeStyles({
  appbar: {
    background: "#fff",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: '3.5rem',
    '@media(min-width:720px)': {
      minHeight: '4rem'
    }
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
  lg_searchbar:{
      display:'none',
      '@media(min-width:720px)' : {
        display:'flex'
      }
  },
  search_icon_button: {
    '@media(min-width:720px)': {
      display: 'none'
    }
  }
});

export const Navbar: React.FC = () => {
  const [showMbSearchbar, setShowMbSearchbar] = useState<boolean>(false);
  const classes = useStyles();
  const router = useRouter();

  // It handles search bar toggle for mobile devices.
  const handleSearchBarToggle = () => {
    setShowMbSearchbar((prev) => !prev);
  };
  const handleMyProfile = () => {
    router.push("/profile/me");
  };
  return (
    <Container maxWidth="sm">
      <AppBar position="fixed" className={classes.appbar}>
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

            <Typography variant="h6" className={classes.title} color={"#000"}>
              UTube
            </Typography>
          </div>

          <TextField size="small" sx={{width:'50%'}} className={classes.lg_searchbar} placeholder="Search for videos" InputProps={{sx:{borderRadius:'1rem'}}}/>

          <div className="display_flex align_center gap_05">
            <IconButton
              className={classes.search_icon_button}
              onClick={handleSearchBarToggle}
            >
              {showMbSearchbar ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
            <div className={"cursor_pointer"}>
              <Tooltip title={"Profile"}>
                <Avatar
                  alt="Y"
                  className={classes.profile_icon}
                  src="url"
                  sx={{ width: "30px", height: "30px" }}
                  onClick={handleMyProfile}
                />
              </Tooltip>
            </div>
          </div>
        </Toolbar>
        {showMbSearchbar && (
          <TextField size="small" sx={{ margin: "0 1rem" }} InputProps={{sx:{borderRadius:'1rem'}}}/>
        )}
        <Divider />
      </AppBar>
    </Container>
  );
};
