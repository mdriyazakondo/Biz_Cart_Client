import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrderApi: builder.mutation({
      query: (orderData) => ({
        url: "orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    userUserGet: builder.query({
      query: (userEmail) => ({
        url: `orders/user/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    myProductsOrder: builder.query({
      query: ({ sellerEmail }) => ({
        url: `orders/my-products-order/${sellerEmail}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updatePayOrder: builder.mutation({
      query: ({ id, paymentStatus, status }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: { paymentStatus, status },
      }),
      invalidatesTags: ["orders"],
    }),
    orderDelete: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderApiMutation,
  useUserUserGetQuery,
  useOrderDeleteMutation,
  useMyProductsOrderQuery,
  useUpdatePayOrderMutation
} = orderApi;
