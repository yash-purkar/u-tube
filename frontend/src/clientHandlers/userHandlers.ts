import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

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
      `${API_BASE_URL}auth/register`,
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
        withCredentials: true,
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
      `${API_BASE_URL}auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
      `${API_BASE_URL}user/search_history`,
      {
        user_id,
        video_id,
      },
      { withCredentials: true }
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
      `${API_BASE_URL}user/search_history?user_id=${user_id}&video_id=${video_id}`,
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
      `${API_BASE_URL}videos/watch?vid_id=${video_id}`,
      { withCredentials: true }
    );
    return (await response).data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Failed to get video details"
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
      `${API_BASE_URL}comment/add_comment`,
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
      `${API_BASE_URL}comment/get_comments/${videoId}`,
      {
        withCredentials: true,
      }
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
      `${API_BASE_URL}comment/delete_comment?comment_id=${comment_id}`,
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
      `${API_BASE_URL}comment/like_comment`,
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
      `${API_BASE_URL}comment/dislike_comment`,
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
      `${API_BASE_URL}videos/like`,
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
      `${API_BASE_URL}videos/dislike`,
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
      `${API_BASE_URL}user/subscribe_or_unsubscribe`,
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
      `${API_BASE_URL}videos/videos_by_user?limit=${3}&currentPage=${currentPage}&user_id=${user_id}`,
      {
        withCredentials: true,
      }
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
      `${API_BASE_URL}videos/liked_videos?username=${username}`,
      {
        withCredentials: true,
      }
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
export const watchLaterHandler = async (video_id: string, user_id: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}user/watch_later`,
      {
        user_id,
        video_id,
      },

      {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer hii`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to update watch later",
    };
  }
};

// It get user's watch later videos
export const usersAllWatchlaterVideos = async (username: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}videos/watch_later_videos?username=${username}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to get watch later videos",
    };
  }
};

// It get user's watch later videos
export const usersHistory = async (username: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}user/history?username=${username}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to get watch later videos",
    };
  }
};

// Clear watch history
export const clearHistory = async (username: string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}user/clear_watch_history?username=${username}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return {
      message: "Failed to clear history",
    };
  }
};

// Create playlist
export const createPlaylist = async ({
  name,
  user,
}: {
  name: string;
  user: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}playlist/create`,
      {
        name,
        user,
      },
      {
        withCredentials: true,
      }
    );

    if (response?.data?.Success) {
      return response.data;
    } else {
      throw new Error(response.data);
    }
  } catch (err: any) {
    throw err?.response?.data ?? { message: "Failed to create playlist" };
  }
};

// delete playlist
export const deletePlaylist = async ({
  playlist_id,
}: {
  playlist_id: string;
}) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}playlist/delete?playlist_id=${playlist_id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    return {
      message: "Failed to delete playlist",
    };
  }
};

// get all playlists
export const getPlaylists = async ({ user }: { user: string }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}playlist/playlists`,
      {
        user,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    return {
      message: "Failed to get playlists",
    };
  }
};

// get all playlists
export const addVideoToPlaylist = async ({
  playlist_ids,
  video,
  unSelectedPlaylists,
}: {
  playlist_ids: string[];
  video: string;
  unSelectedPlaylists: string[];
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}playlist/add_video`,
      {
        playlist_ids,
        video,
        unSelectedPlaylists,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    return {
      message: "Failed to add video to playlist",
    };
  }
};

// Get playlist by id
export const getPlaylistDetails = async (playlist_id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}playlist/playlist?playlist_id=${playlist_id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return {
      message: "Failed to get playlist details",
    };
  }
};
