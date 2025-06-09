import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const diseasesBySymptomApi = createApi({
  reducerPath: "diseasesBySymptomApi",
  baseQuery,
  tagTypes: ["DiseasesBySymptom"],
  endpoints: (build) => ({
    getDiseaseBySymptomsId: build.query({
      query: (params={}) => ({
        url: `/diseases/by-symptoms`,
        method: "GET",
        params:{
          symptomIds :params?.symptomIds
        }
      }),
      providesTags: (result, error, id) => [{ type: "DiseasesBySymptom", id }],
    }),
  }),
});

export const { useGetDiseaseBySymptomsIdQuery } = diseasesBySymptomApi;
 export default diseasesBySymptomApi