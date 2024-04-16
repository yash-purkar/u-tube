import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import { Comment } from "@/app/types";
import { getUploadedDate } from "@/clientHandlers/handlers";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewComment,
  deleteComment,
  likeComment,
} from "@/clientHandlers/userHandlers";
import { useSnackbar } from "notistack";
import { useAppSelector } from "@/app/lib/redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface VideoCommentsProps {
  comments: Comment[];
  videoId: string;
}

const useStyles = makeStyles({
  comments_header: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    "@media(min-width:460px)": {
      gap: "3rem",
    },
  },
  sort_box: {
    position: "absolute",
    top: "1.8rem",
    backgroundColor: "#fff",
    fontSize: "0.9rem",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    zIndex: 2,
  },
  sort_option: {
    padding: "1rem",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer",
    },
  },
  active_sort_order: {
    backgroundColor: "lightgray !important",
  },
  comments_container: {
    marginTop: "1.8rem",
  },
  single_Comment: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.8rem",
    marginBottom: "1.5rem",
  },
  deleted_comment_user_name: {
    userSelect: "none",
    fontWeight: "bold",
    color: "gray",
  },
  deleted_comment_text: {
    color: "gray",
    fontStyle: "italic",
  },
});

const VideoComments: React.FC<VideoCommentsProps> = ({ comments, videoId }) => {
  const classes = useStyles();
  const [showSortBy, setShowSortBy] = useState<boolean>(false);
  const [commentText, setCommentText] = useState("");
  const [videoComments, setVideoComments] = useState(comments);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAppSelector((state) => state.user);

  const { mutate: commentMutation } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async ({
      action,
      data,
    }: {
      action: "ADD" | "DELETE" | "LIKE";
      data?: { commentId?: string };
    }) => {
      switch (action) {
        case "ADD":
          return addNewComment(videoId, commentText, user?._id as string);

        case "DELETE":
          return deleteComment(data?.commentId as string);

        case "LIKE":
          return likeComment(
            data?.commentId as string,
            user?._id as string,
            videoId
          );
      }
    },
    onSuccess: (data) => {
      if (data?.Success) {
        setCommentText("");
        setVideoComments(data?.comments);
        enqueueSnackbar(data?.message as string, {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message as string, {
        variant: "warning",
        autoHideDuration: 1500,
      });
    },
  });

  // It handles add comment
  const handleAddComment = () => {
    if (commentText.length) {
      commentMutation({ action: "ADD" });
    }
  };

  // It handles delete comment
  const handleDeleteComment = (commentId: string) => {
    commentMutation({ action: "DELETE", data: { commentId } });
  };

  // It handles like comment
  const handleLikeComment = (commentId: string) => {
    commentMutation({ action: "LIKE", data: { commentId } });
  };
  return (
    <>
      <Box>
        {/* comments header section */}
        <Box className={classes.comments_header}>
          <Typography variant="h6" fontWeight={"bold"}>
            {videoComments?.length} Comments
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
              width: "10rem",
            }}
          >
            <IconButton
              onClick={() => {
                setShowSortBy((prev) => !prev);
              }}
            >
              {showSortBy ? <CloseIcon /> : <SortIcon />}
            </IconButton>
            <p>Sort by</p>
            {/* small dialouge box for sort order*/}
            {showSortBy && (
              <Box className={classes.sort_box}>
                <p className={classes.sort_option}>Top Comments</p>
                <p className={classes.sort_option}>Newest First</p>
              </Box>
            )}
          </div>
        </Box>
        {/* Comment input section */}
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <Avatar />
          <TextField
            id="standard-basic"
            label="Add a comment"
            variant="standard"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            fullWidth
          />
          <Button onClick={handleAddComment} variant="contained">
            Add
          </Button>
        </Box>

        {/* Comments Mapping */}
        <Box className={classes.comments_container}>
          {videoComments?.map((comment: Comment) => {
            const commentAddedOn = getUploadedDate(
              new Date(comment?.createdAt)
            );
            return (
              <Box key={comment?._id} className={classes.single_Comment}>
                <Avatar />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <p>
                    <span
                      style={{
                        filter: `blur(${
                          comment.is_deleted_by_creator ? "3px" : "0"
                        })`,
                      }}
                      className={classes.deleted_comment_user_name}
                    >
                      {comment?.user?.username}
                    </span>{" "}
                    <small>{commentAddedOn}</small>
                    {comment?.user?._id === user?._id &&
                      !comment.is_deleted_by_creator && (
                        <IconButton
                          size="small"
                          sx={{ padding: "0", margin: "0" }}
                          onClick={() => handleDeleteComment(comment?._id)}
                        >
                          <DeleteIcon sx={{ fontSize: "1.3rem" }} />
                        </IconButton>
                      )}
                  </p>
                  {comment.is_deleted_by_creator ? (
                    <p className={classes.deleted_comment_text}>
                      This comment is deleted by creator
                    </p>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                  <div>
                    <IconButton
                      onClick={() => handleLikeComment(comment?._id)}
                      size="small"
                      sx={{
                        padding: "0",
                        margin: "0",
                        marginRight: "0.6rem",
                      }}
                      disabled={comment?.is_deleted_by_creator}
                    >
                      {comment?.likes?.includes(user?._id as string) &&
                      !comment?.is_deleted_by_creator  ? (
                        <ThumbUpIcon />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )} 
                      <small style={{margin:'0.5rem'}}>{comment?.likes?.length}</small>
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ padding: "0", margin: "0", marginRight: "0.6rem" }}
                    >
                      <ThumbDownOffAltIcon
                        sx={{
                          cursor: comment.is_deleted_by_creator
                            ? "not-allowed"
                            : "pointer",
                        }}
                      />
                    </IconButton>
                  </div>
                </div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default VideoComments;

// We will set the updated comments in the videoComments because we only want to update the comments so we don't need to fetch the whole videoDetails again.
