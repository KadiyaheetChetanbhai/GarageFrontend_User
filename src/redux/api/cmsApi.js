import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  baseQuery,
  tagTypes: ["CMS"],
  endpoints: (build) => ({
    getCmsContent: build.query({
      query: (type) => ({
        url: `/cms/${type}`,
        method: "GET",
      }),

      invalidatesTags: (result, error, arg) => [{ type: "CMS", id: arg }],
    }),
  }),
});

export const { useGetCmsContentQuery } = cmsApi;

export default cmsApi;
