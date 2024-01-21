import { baseApi } from "../../api/baseApi";

const academicSemisterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    academicSemister: builder.query({
      query: () => ({
        url: "/academic-semister",
        method: "GET",
      }),
    }),
  }),
});

export const { useAcademicSemisterQuery } = academicSemisterApi;
