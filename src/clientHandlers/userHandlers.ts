import axios from "axios";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

// It handles Register user.
export const register = async (params: RegisterProps) => {
  const { firstName, lastName, email, password } = params;

  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/register",
      {
        firstName,
        lastName,
        email,
        password,
        username: `@${firstName.toLocaleLowerCase()}${lastName.toLocaleLowerCase()}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.error || "Failed to Register");
  }
};

// It handles user login
export const login = async (params: LoginProps) => {
  const { email, password } = params;
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.error || "Failed to Login");
  }
};

// It handles user search history
export const addUserSearchHistory = async (
  user_id: string,
  video_id: string
) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/user/search_history",
      { user_id, video_id }
    );
    return data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.error || "Failed to add search history"
    );
  }
};

// It removes search history
export const removeUserSearchHistory = async (
  user_id: string,
  video_id: string
) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/user/search_history?user_id=${user_id}&video_id=${video_id}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Failed to remove search history"
    );
  }
};

// Get video details
export const getVideoDetails = async (video_id: string) => {
  try {
    const response = axios.get(
      `http://localhost:3001/api/videos/watch?vid_id=${video_id}`
    );

    return (await response).data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Failed to remove search history"
    );
  }
};

// Add Comment handler
export const addNewComment = async (
  videoId: string,
  content: string,
  userId: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/comment/add_comment",
      { user: userId, video: videoId, content },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// get all comments of a particular video
export const getComments = async (videoId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/comment/get_comments/${videoId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

// delete comment
export const deleteComment = async (comment_id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/comment/delete_comment?comment_id=${comment_id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

// like comment
export const likeComment = async (
  comment_id: string,
  user_id: string,
  video_id: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/comment/like_comment",
      { comment_id, user_id, video_id },
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
// dislike comment
export const dislikeComment = async (
  comment_id: string,
  user_id: string,
  video_id: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/comment/dislike_comment",
      { comment_id, user_id, video_id },
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

// like video
export const likeVideo = async (video_id: string, user_id: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/videos/like",
      {
        video_id,
        user_id,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// dislike video
export const dislikeVideo = async (video_id: string, user_id: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/videos/dislike",
      {
        video_id,
        user_id,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// subscribe and unsubscribe video
export const subscribeAndUnsubscribeVideo = async (
  subscriber: string,
  subscribe_to: string,
  video_id: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/subscribe_or_unsubscribe",
      {
        subscriber,
        subscribe_to,
        video_id,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// It fetched videos by user id
export const videosByUser = async (user_id: string, currentPage: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/videos/videos_by_user?limit=${3}&currentPage=${currentPage}&user_id=${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's liked video to show in liked page

export const getUsersLikedVideos = async (username: string) => {
  try {
    // we don't need to pass userId from here, we'll take it from cookies in backend.
    const response = await axios.get(
      `http://localhost:3001/api/videos/liked_videos?username=${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to get liked videos.",
    };
  }
};

// It handles watchlater video add and remove
export const watchLaterHandler = async (video_id: string,user_id: string, ) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/watch_later",
      {
        user_id,
        video_id,
      }
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to update watch later",
    };
  }
};
