import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery,
  tagTypes: ["Social"],
  endpoints: (build) => ({
    getSocialLinks: build.query({
      query: () => ({
        url: "/social-media",
        method: "GET",
      }),
      invalidatesTags: [{ type: "Social", id: "LIST" }],
    }),
  }),
});

export const { useGetSocialLinksQuery } = socialApi;

export default socialApi;
