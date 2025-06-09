import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery,
  tagTypes: ["brand"],
  endpoints: (build) => ({
    getBrandByDietaryId: build.query({
      query: (dietaryRequirementId) => ({
        url: `/brand/by-dietary-requirement/${dietaryRequirementId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result
          ? [
              ...result?.data?.map((brand) => ({ type: "brand", id: brand._id })),
              { type: "brand", id: "LIST" },
            ]
          : [{ type: "brand", id: "LIST" }],
    }),
  }),
});

export const { useGetBrandByDietaryIdQuery } = brandApi;
export default brandApi;
