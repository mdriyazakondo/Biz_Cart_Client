import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "auth/all-users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getRoleByUser: builder.query({
      query: () => ({
        url: "auth/users-role",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ role, userId }) => ({
        url: "auth/update-role",
        method: "PUT",
        body: { userId, role },
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetRoleByUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
