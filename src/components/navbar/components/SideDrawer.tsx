import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HistoryIcon from "@mui/icons-material/History";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { setIsLoggedIn} from "@/app/lib/redux/slices/authSlice";

interface DrawerItem {
  name: string;
  Icon: any;
  redirectionUrl: string;
}

const sideDrawerListItems: DrawerItem[] = [
  {
    name: "Home",
    Icon: HomeIcon,
    redirectionUrl: "/",
  },
  {
    name: "Playlist",
    Icon: PlayCircleIcon,
    redirectionUrl: "/playlist",
  },
  {
    name: "Liked",
    Icon: FavoriteIcon,
    redirectionUrl: "/liked",
  },
  {
    name: "Watch Later",
    Icon: WatchLaterIcon,
    redirectionUrl: "/watchlater",
  },
  {
    name: "History",
    Icon: HistoryIcon,
    redirectionUrl: "/history",
  },
];

export const SideDrawer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  // List to show in drawer

  // It handles redirection
  const handleRedirection = (url: string) => {
    router.push(url);
  };

  // It handles login and logout;
  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      // It will delete the cookie bcz given time is already expired so it will be deleted.
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(setIsLoggedIn(false));
    } else {
      router.push("/login");
    }
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {sideDrawerListItems.map((item: DrawerItem) => (
          <ListItem
            key={item.name}
            onClick={() => handleRedirection(item.redirectionUrl)}
          >
            <ListItemButton>
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Items after divider line */}
      <List>
        <ListItem>
          <ListItemButton onClick={handleLoginLogoutClick}>
            <ListItemIcon>
              {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
            </ListItemIcon>
            <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div>
        {/* Click of this drawer will open */}
        <div onClick={toggleDrawer}>{children}</div>
      </div>
      {/* Content to show in drawer */}
      <Drawer open={open} onClose={toggleDrawer}>
        {drawerList}
      </Drawer>
    </div>
  );
};
