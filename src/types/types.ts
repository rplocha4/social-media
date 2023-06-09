export type TPost = {
  avatar: string;
  content: string;
  post_id: string;
  user_id: string;
  username: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: number;
  image: string;
};
export type TComment = {
  comment_id: string;
  content: string;
  created_at: string;
  parent_comment_id: string;
  post_id: string;
  user_id: string;
  username: string;
  avatar: string;
  image: string;
};

export type TEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  image: string;
  users: {
    user_id: string;
    username: string;
    avatar: string;
  }[];
};
export const defaultAvatar =
  'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';
