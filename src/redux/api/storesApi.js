// api/storesApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const storesApi = createApi({
  reducerPath: "storesApi",
  baseQuery,
  tagTypes: ["Stores"],
  endpoints: (build) => ({
    getStores: build.infiniteQuery({
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
          page: pageParam.page || 1,
          limit: pageParam.limit || 10,
          sortField: queryArg?.queryArg?.sortField || "createdAt",
          sortOrder: queryArg?.queryArg?.sortOrder || -1,
          dietIds: queryArg?.queryArg?.dietIds,
          pincode: queryArg?.queryArg?.pincode,
          priceRangeStart: queryArg?.queryArg?.priceRangeStart,
          priceRangeEnd: queryArg?.queryArg?.priceRangeEnd,
          services: queryArg?.queryArg?.services,
          rating: queryArg?.queryArg?.rating,
        };
        return {
          url: "/stores",
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
                  type: "Stores",
                  id: _id,
                })),
              { type: "Stores", id: "LIST" },
            ]
          : [{ type: "Stores", id: "LIST" }],
    }),
    getStoresById: build.query({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result ? [{ type: "Stores", id }] : [],
    }),
  }),
});

export const { useGetStoresInfiniteQuery, useGetStoresByIdQuery } = storesApi;
export default storesApi;
