import { TAcademicSemisterQueryParam } from "../../../types/academicManagementTypes";
import { TResponseRedux } from "../../../types/global";
import {
  TCourse,
  TCourseFaculty,
  TSemisterRegistration,
} from "../../../types/semesterRegistrationTypes";
import { baseApi } from "../../api/baseApi";

const semesterManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllRegisteredSemsters: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TAcademicSemisterQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/semister-registration",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (
        response: TResponseRedux<TSemisterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
    }),

    semesterRegister: builder.mutation({
      query: payload => ({
        url: "/semister-registration/create-semister-registration",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["semester"],
    }),
    updateSemesterRegister: builder.mutation({
      query: args => ({
        url: `/semister-registration/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllCourses: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TAcademicSemisterQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/course",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
    }),
    createCourse: builder.mutation({
      query: payload => ({
        url: "/course/create-course",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["course"],
    }),
    assignFacultiesToCourse: builder.mutation({
      query: args => ({
        url: `/course/${args?.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["course"],
    }),
    getAssinedFacultiesToCourse: builder.query({
      query: args => {
        return {
          url: `/course/get-assinged-faculties/${args}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCourseFaculty>) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
    }),
    offerCourse: builder.mutation({
      query: payload => ({
        url: "/offered-course/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSemesterRegisterMutation,
  useGetAllRegisteredSemstersQuery,
  useUpdateSemesterRegisterMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useAssignFacultiesToCourseMutation,
  useGetAssinedFacultiesToCourseQuery,
  useOfferCourseMutation,
} = semesterManagementApi;
