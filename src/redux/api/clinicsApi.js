import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const clinicsApi = createApi({
  reducerPath: "clinicsApi",
  baseQuery,
  tagTypes: ["Clinic"],
  endpoints: (builder) => ({
    getClinics: builder.query({
      query: (params = {}) => ({
        url: "/clinics",
        method: "GET",
        params: {
          pincode: params.pincode,
          priceRangeStart: params.priceRangeStart,
          priceRangeEnd: params.priceRangeEnd,
          services: params.services,
          date: params.date,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Clinic", id: "LIST" },
              ...result.data.map(({ _id }) => ({
                type: "Clinic",
                id: _id,
              })),
            ]
          : [{ type: "Clinic", id: "LIST" }],
    }),
    getContinuousClinics: builder.infiniteQuery({
      keepUnusedDataFor: 5000,
      maxPages: 20,
      infiniteQueryOptions: {
        maxPages: 20,
        initialPageParam: {
          page: 1,
          pageSize: 10,
        },
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          const { nextPage } = lastPage?.pagination || {};
          if (nextPage) {
            return {
              ...lastPageParam,
              page: nextPage,
            };
          }
          return undefined;
        },
      },
      query: ({ pageParam = {}, queryArg = {} }) => {
        const params = {
          pincode: queryArg?.queryArg?.pincode,
          priceRangeStart: queryArg?.queryArg?.priceRangeStart,
          priceRangeEnd: queryArg?.queryArg?.priceRangeEnd,
          services: queryArg?.queryArg?.services,
          date: queryArg?.queryArg?.date,
          rating: queryArg?.queryArg?.rating,
          page: pageParam?.page || 1,
          limit: pageParam?.pageSize || 10,
        };
        return {
          url: "/clinics",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => ({
        data: response.data,
        pagination: response.pagination,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.pages
                .flatMap((page) => page.data)
                .map(({ _id }) => ({
                  type: "Clinic",
                  id: _id,
                })),
              { type: "Clinic", id: "LIST" },
            ]
          : [{ type: "Clinic", id: "LIST" }],
    }),
    getClinicById: builder.query({
      query: (id) => `/clinics/${id}`,
      providesTags: (result, error, id) => [{ type: "Clinic", id }],
    }),
  }),
});

export const {
  useGetClinicsQuery,
  useGetContinuousClinicsInfiniteQuery,
  useGetClinicByIdQuery,
} = clinicsApi;

export default clinicsApi;
