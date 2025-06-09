import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery,
  tagTypes: ["Contact"],
  endpoints: (build) => ({
    submitContactForm: build.mutation({
      query: (formData) => ({
        url: "/contact/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactApi;

export default contactApi;
