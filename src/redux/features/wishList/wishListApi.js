import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({
    createWishList: builder.mutation({
      query: (wishlist) => ({
        url: "wishlists",
        method: "POST",
        body: wishlist,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getAllWishlist: builder.query({
      query: (userEmail) => ({
        url: `wishlists/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useCreateWishListMutation,
  useGetAllWishlistQuery,
  useDeleteWishlistMutation,
} = wishListApi;
