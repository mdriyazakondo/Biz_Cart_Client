import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/users/userApi";
import { productApi } from "./features/product/productApi";
import { wishListApi } from "./features/wishList/wishListApi";
import { addToCartApi } from "./features/addToCart/addToCartApi";
import { orderApi } from "./features/order/orderApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [wishListApi.reducerPath]: wishListApi.reducer,
    [addToCartApi.reducerPath]: addToCartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      wishListApi.middleware,
      addToCartApi.middleware,
      orderApi.middleware,
    ),
});
