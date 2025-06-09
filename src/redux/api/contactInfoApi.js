import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const contactInfoApi = createApi({
  reducerPath: "contactInfoApi",
  baseQuery,
  tagTypes: ["contactInfo"],
  endpoints: (build) => ({
    getContactInfo: build.query({
      query: () => ({
        url: "/contact-info",
        method: "GET",
      }),
      invalidatesTags: [{ type: "contactInfo", id: "LIST" }],
    }),
  }),
});

export const { useGetContactInfoQuery } = contactInfoApi;
export default contactInfoApi;
