import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users"],

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = userApi;
