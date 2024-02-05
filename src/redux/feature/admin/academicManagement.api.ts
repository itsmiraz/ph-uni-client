import { TAcademicSemister } from "../../../types/academicSemsterTypes";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllacademicSemister: builder.query({
      query: () => ({
        url: "/academic-semister",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicSemister[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
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
