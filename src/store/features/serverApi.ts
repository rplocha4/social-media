import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://social-media-backend-tfft.onrender.com/api',
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (user_id) => `/posts/friends/${user_id}`,
    }),
    getPostComments: builder.query({
      query: (post_id) => `/comments/${post_id}`,
    }),
    getPost: builder.query({
      query: (post_id) => `/post/${post_id}`,
    }),

    getPostLikes: builder.query({
      query: (post_id) => `/likes/${post_id}`,
    }),
    likePost: builder.mutation({
      query: ({ post_id, user_id }) => ({
        url: `/likes/${post_id}/${user_id}`,
        method: 'POST',
      }),
    }),
    unlikePost: builder.mutation({
      query: ({ post_id, user_id }) => ({
        url: `/likes/${post_id}/${user_id}`,
        method: 'DELETE',
      }),
    }),
    createPost: builder.mutation({
      query: ({ user_id, content }) => ({
        url: `/posts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { content, user_id },
      }),
    }),
    createComment: builder.mutation({
      query: ({ user_id, post_id, content }) => ({
        url: `/comments`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { user_id, post_id, content },
      }),
    }),
    getUserPosts: builder.query({
      query: (username) => `/posts/${username}`,
    }),
    getUserComments: builder.query({
      query: (username) => `/user/comments/${username}`,
    }),
    getUserLikes: builder.query({
      query: (username) => `/user/likes/${username}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useCreatePostMutation,
  useCreateCommentMutation,
  useLazyGetUserCommentsQuery,
  useLazyGetUserLikesQuery,
  useLazyGetUserPostsQuery,
} = serverApi;
