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
    image: string
}
export type TComment = {
    comment_id: string;
    content: string;
    created_at: string;
    parent_comment_id: string;
    post_id: string;
    user_id: string;
    username: string;
    avatar: string;
}
