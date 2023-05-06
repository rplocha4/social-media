import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serverApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: builder => ({
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
        query: ({post_id,user_id}) => ({
            url: `/likes/${post_id}/${user_id}`,
            method: 'POST',
        }),
    }),
    unlikePost: builder.mutation({
        query: ({post_id,user_id}) => ({
            url: `/likes/${post_id}/${user_id}`,
            method: 'DELETE',
        }),
    }),


  })
})

export const { useGetPostsQuery, useGetPostCommentsQuery, useGetPostLikesQuery, useGetPostQuery, useLikePostMutation, useUnlikePostMutation } = serverApi