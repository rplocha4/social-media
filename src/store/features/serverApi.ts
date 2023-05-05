import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serverApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: (user_id) => `/posts/friends/${user_id}`,
    })
  })
})

export const { useGetPostsQuery } = serverApi