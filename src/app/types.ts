export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  subscribers: string[];
  videos: Video[];
  liked_videos: Video[];
  watch_later_videos: Video[];
  history: Video[];
  search_history: string[];
}

export interface Video {
  _id: string;
  user: User;
  title: string;
  description: string;
  thumbnail_url: string;
  embeded_url: string;
  views: number;
  category: string;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
  createdAt: Date;
}

interface Comment {}
