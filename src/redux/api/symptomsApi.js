import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const symptomsApi = createApi({
  reducerPath: "symptomsApi",
  baseQuery,
  tagTypes: ["Symptoms"],
  endpoints: (build) => ({
    getSymptoms: build.query({
      query: (params = {}) => ({
        url: "/symptoms",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search || "",
          sortField: params.sortField || "name",
          sortOrder: params.sortOrder || 1,
        },
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: (result) =>
        result?.symptoms
          ? [
              ...result.symptoms.map(({ _id }) => ({
                type: "Symptoms",
                id: _id,
              })),
              { type: "Symptoms", id: "LIST" },
            ]
          : [{ type: "Symptoms", id: "LIST" }],
    }),
  }),
});

export const { useGetSymptomsQuery } = symptomsApi;
export default symptomsApi;
