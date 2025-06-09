import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery,
  tagTypes: ["Faq"],
  endpoints: (build) => ({
    getFaqs: build.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      invalidatesTags: [{ type: "Faq", id: "LIST" }],
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;

export default faqApi;
