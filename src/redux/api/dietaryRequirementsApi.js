// api/dietaryRequirementsApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const dietaryRequirementsApi = createApi({
  reducerPath: "dietaryRequirementsApi",
  baseQuery,
  tagTypes: ["DietaryRequirements"],
  endpoints: (build) => ({
    getDietaryRequirements: build.query({
      query: (params = {}) => ({
        url: "/dietary-requirements",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 100,
          sortField: params.sortField || "name",
          sortOrder: params.sortOrder || 1,
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map(({ _id }) => ({
                type: "DietaryRequirements",
                id: _id,
              })),
              { type: "DietaryRequirements", id: "LIST" },
            ]
          : [{ type: "DietaryRequirements", id: "LIST" }],
    }),
  }),
});

export const { useGetDietaryRequirementsQuery } = dietaryRequirementsApi;
export default dietaryRequirementsApi;
