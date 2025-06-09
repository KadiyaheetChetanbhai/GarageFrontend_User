import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const newsLetterApi = createApi({
  reducerPath: "newsLetterApi",
  baseQuery,
  tagTypes: ["Subscription"],
  endpoints: (build) => ({
    submitSubscription: build.mutation({
      query: (subscriptionData) => ({
        url: "/subscribe",
        method: "POST",
        body: subscriptionData,
      }),
      invalidatesTags: [{ type: "Subscription", id: "LIST" }],
    }),
  }),
});

export const { useSubmitSubscriptionMutation } = newsLetterApi;

export default newsLetterApi;
