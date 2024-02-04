import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllacademicSemister: builder.query({
      query: () => ({
        url: "/academic-semister",
        method: "GET",
      }),
    }),
    createAcademicSemester: builder.mutation({
      query: payload => ({
        url: "/academic-semister/create-academic-semister",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllacademicSemisterQuery,
  useCreateAcademicSemesterMutation,
} = academicManagementApi;
