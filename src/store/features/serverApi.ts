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
    sendMessages: builder.mutation({
      query: ({ body }) => ({
        url: `/messages`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      }),
    }),
    getMessages: builder.query({
      query: ({ user1_id, user2_id }) => ({
        url: `/messages/${user1_id}/${user2_id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    followUser: builder.mutation({
      query: ({ user_id, follower }) => ({
        url: `/follow/${user_id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { user_id: follower },
      }),
    }),
    unfollowUser: builder.mutation({
      query: ({ user_id, follower }) => ({
        url: `/follow/${user_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { user_id: follower },
      }),
    }),
    getFollowers: builder.query({
      query: (user_id) => ({
        url: `/followers/${user_id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getFollowing: builder.query({
      query: (user_id) => ({
        url: `/following/${user_id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getConversations: builder.query({
      query: (user_id) => ({
        url: `/conversations/${user_id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    updatePost: builder.mutation({
      query: ({ body, post_id }) => ({
        url: `/post/${post_id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ body, comment_id }) => ({
        url: `/comment/${comment_id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    setUserPrivate: builder.mutation({
      query: ({ user_id, setPrivate }) => ({
        url: `/user/${user_id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { setPrivate },
      }),
    }),
    createEvent: builder.mutation({
      query: ({ body }) => ({
        url: `/events`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: `/events`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    joinEvent: builder.mutation({
      query: ({ event_id, user_id }) => ({
        url: `/events/${event_id}/join`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { user_id },
      }),
    }),
    leaveEvent: builder.mutation({
      query: ({ event_id, user_id }) => ({
        url: `/events/${event_id}/resign`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: { user_id },
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
  useSendMessagesMutation,
  useLazyGetMessagesQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useLazyGetConversationsQuery,
  useUpdatePostMutation,
  useUpdateCommentMutation,
  useGetUsersQuery,
  useSetUserPrivateMutation,
  useCreateEventMutation,
  useGetEventsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
} = serverApi;
