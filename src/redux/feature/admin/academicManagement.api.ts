import {
  TAcademicSemister,
  TAcademicSemisterQueryParam,
} from "../../../types/academicManagementTypes";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllacademicSemister: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args[0]?.name) {
          args.forEach((element: TAcademicSemisterQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/academic-semister",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemister[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
    }),
    getAllacademicFaculty: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args[0]?.name) {
          args.forEach((element: TAcademicSemisterQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/academic-faculty",
          method: "GET",
          params: params,
        };
      },
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
    createAcademicFaculty: builder.mutation({
      query: payload => ({
        url: "/academic-faculty/create-academic-faculty",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllacademicSemisterQuery,
  useCreateAcademicSemesterMutation,
  useCreateAcademicFacultyMutation,
} = academicManagementApi;
