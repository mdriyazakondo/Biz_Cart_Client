import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../apiSlice";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["products"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: "products/new-product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
    myAllProduct: builder.query({
      query: () => ({
        url: `products`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    trendingProducts: builder.query({
      query: () => ({
        url: `products/trending`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    featuredProducts: builder.query({
      query: () => ({
        url: `products/featured`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    productUpdate: builder.mutation({
      query: ({ productId, product }) => ({
        url: `products/update-product/${productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
    productDelete: builder.mutation({
      query: (productId) => ({
        url: `products/delete-product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useMyAllProductQuery,
  useProductUpdateMutation,
  useProductDeleteMutation,
  useTrendingProductsQuery,
  useFeaturedProductsQuery,
} = productApi;
