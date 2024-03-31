import { Avatar, Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import remove_this_image_later from "../../../public/assets/delete_later.jpg";
import styles from "./singleVideo.module.css";
import { makeStyles } from "@mui/styles";

const useStyles: () => any = makeStyles({
  video_card: {
    margin: "3rem 0 1rem",
    maxWidth: "18rem",
    "@media (min-width:1250px)": {
      maxWidth: "20rem",
    },
  },
  video_info: {
    display: "flex",
    gap: "1rem",
  },
});

const SingleVideo: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.video_card} component={"div"}>
      <Box>
        <Image
          src={remove_this_image_later}
          alt="img"
          className={styles.video_thumbnail}
        />
      </Box>
      <Box className={classes.video_info} component={"div"}>
        <Avatar></Avatar>
        <Box>
          <h4 className={styles.video_title}>
            Sooraj dooba hain full video song | arjit sing ....
          </h4>
          <p>code with harry</p>
          <div className={styles.video_extra_info}>
            <p>230M Views</p>
            <span>.</span>
            <p>10 years ago</p>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleVideo;
