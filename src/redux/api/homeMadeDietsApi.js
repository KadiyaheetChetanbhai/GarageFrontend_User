// api/homemadeDietsApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const homemadeDietsApi = createApi({
  reducerPath: "homemadeDietsApi",
  baseQuery,
  tagTypes: ["HomemadeDiets"],
  endpoints: (build) => ({
    getHomemadeDiets: build.infiniteQuery({
      keepUnusedDataFor: 5000,
      maxPages: 20,
      infiniteQueryOptions: {
        maxPages: 20,
        initialPageParam: {
          page: 1,
          pageSize: 9,
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
          page: pageParam?.page || 1,
          limit: pageParam?.pageSize || 10,
          searchTerm: queryArg?.searchTerm || "",
          sortField: queryArg?.sortField || "name",
          sortOrder: queryArg?.sortOrder || 1,
        };
        return {
          url: "/homemade-diets",
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
                  type: "HomemadeDiets",
                  id: _id,
                })),
              { type: "HomemadeDiets", id: "LIST" },
            ]
          : [{ type: "HomemadeDiets", id: "LIST" }],
    }),
    getHomemadeDietById: build.query({
      query: (id) => ({
        url: `/homemade-diets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "HomemadeDiets", id }],
    }),
  }),
});

export const { useGetHomemadeDietsInfiniteQuery, useGetHomemadeDietByIdQuery } =
  homemadeDietsApi;
