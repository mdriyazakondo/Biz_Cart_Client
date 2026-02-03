import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/users/userApi";
import { productApi } from "./features/product/productApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});
