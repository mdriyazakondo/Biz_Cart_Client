import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const addToCartApi = createApi({
  reducerPath: "addToCartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["addToCart"],
  endpoints: (builder) => ({
    createAddToCart: builder.mutation({
      query: (AddToCart) => ({
        url: "addToCarts",
        method: "POST",
        body: AddToCart,
      }),
      invalidatesTags: ["addToCart"],
    }),
    getAllAddToCart: builder.query({
      query: (userEmail) => ({
        url: `addToCarts/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["addToCart"],
    }),
    incrementAddToCart: builder.mutation({
      query: (id) => ({
        url: `addToCarts/${id}/increment`,
        method: "PATCH",
      }),
      invalidatesTags: ["addToCart"],
    }),
    decrementAddToCart: builder.mutation({
      query: (id) => ({
        url: `addToCarts/${id}/decrement`,
        method: "PATCH",
      }),
      invalidatesTags: ["addToCart"],
    }),
    deleteAddToCart: builder.mutation({
      query: (id) => ({
        url: `addToCarts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addToCart"],
    }),
  }),
});

export const {
  useCreateAddToCartMutation,
  useGetAllAddToCartQuery,
  useDeleteAddToCartMutation,
  useIncrementAddToCartMutation,
  useDecrementAddToCartMutation,
} = addToCartApi;
