export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  subscribers: number;
  videos: Video[];
  liked_videos: Video[];
  watch_later_videos: Video[];
  history: Video[];
}

export interface Video {
    user: User;
    title: string;
    description: string;
    thumbnail_url: string;
    embeded_url: string;
    views: number;
    category: string;
    likes: number;
    dislikes: number;
    comments: Comment[];
    createdAt: Date
}

interface Comment {

}