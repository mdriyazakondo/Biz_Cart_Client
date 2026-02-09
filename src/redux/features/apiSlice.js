import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    (result?.error?.status === 401 || result.error.status === 403)
  ) {
    console.log(result?.error?.status);
    window.location.href = "/";
  }

  return result;
};

//  baseUrl: "https://biz-cart-server.vercel.app/api/",
