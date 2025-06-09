// api/dietsApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const dietsApi = createApi({
  reducerPath: "dietsApi",
  baseQuery,
  tagTypes: ["Diets"],
  endpoints: (build) => ({
    getDietByBrandAndDietaryId: build.query({
      query: (params = {}) => ({
        url: "/diets",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 50,
          sortField: params.sortField || "name",
          sortOrder: params.sortOrder || 1,
          brand: params.brand || null,
          dietaryRequirements: params.dietaryRequirements || null,
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((diet) => ({ type: "Diets", id: diet._id })),
              { type: "Diets", id: "LIST" },
            ]
          : [{ type: "Diets", id: "LIST" }],
    }),
    getDietById: build.query({
      query: (id) => ({
        url: `/diets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result ? [{ type: "Diets", id }] : [],
    }),
  }),
});

export const { useGetDietByBrandAndDietaryIdQuery, useGetDietByIdQuery } = dietsApi;
export default dietsApi;
