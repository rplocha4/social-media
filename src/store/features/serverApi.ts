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
      query: ({ body }) => ({
        url: `/posts`,
        method: 'POST',
        body: body,
      }),
    }),
    createComment: builder.mutation({
      query: ({ body }) => ({
        url: `/comments`,
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },

        body: body,
      }),
    }),
    getUserPosts: builder.query({
      query: (username) => ({
        url: `/posts/${username}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getUserComments: builder.query({
      query: (username) => ({
        url: `/user/comments/${username}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getUserLikes: builder.query({
      query: (username) => ({
        url: `/user/likes/${username}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getUser: builder.query({
      query: (username) => `/user/${username}`,
    }),
    searchUsers: builder.query({
      query: (username) => `/search/${username}`,
    }),
    updateUser: builder.mutation({
      query: ({ body }) => ({
        url: `/user`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (comment_id) => ({
        url: `/comments/${comment_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    deletePost: builder.mutation({
      query: (post_id) => ({
        url: `/posts/${post_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
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
  useGetUserQuery,
  useLazySearchUsersQuery,
  useUpdateUserMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
} = serverApi;
