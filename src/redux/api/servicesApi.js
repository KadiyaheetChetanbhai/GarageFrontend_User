import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery,
  tagTypes: ["Service"],
  endpoints: (build) => ({
    getServices: build.query({
      query: (params = {}) => ({
        url: "/services",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          searchTerm: params.searchTerm || "",
          sortField: params.sortField || "serviceName",
          sortOrder: params.sortOrder || 1,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Service", id: "LIST" },
              ...result.data.map((item) => ({
                type: "Service",
                id: item._id,
              })),
            ]
          : [{ type: "Service", id: "LIST" }],
    }),
    getChildServiceById: build.query({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),
  }),
});

export const { useGetServicesQuery, useGetChildServiceByIdQuery } = servicesApi;

export default servicesApi;
