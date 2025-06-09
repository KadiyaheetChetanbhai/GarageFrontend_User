import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

// Define the API slice
export const helpfulResourcesApi = createApi({
  reducerPath: "helpfulResourcesApi",
  baseQuery,
  tagTypes: ["HelpfulResource"],
  endpoints: (build) => ({
    getHelpfulResources: build.query({
      query: (params = {}) => ({
        url: "/helpful-resources",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          sortField: params.sortField || "title",
          sortOrder: params.sortOrder || 1,
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "HelpfulResource", id })),
              { type: "HelpfulResource", id: "LIST" },
            ]
          : [{ type: "HelpfulResource", id: "LIST" }],
    }),
  }),
});

export const { useGetHelpfulResourcesQuery } = helpfulResourcesApi;
export default helpfulResourcesApi;
