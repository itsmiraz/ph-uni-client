import { TAcademicSemisterQueryParam } from "../../../types/academicManagementTypes";
import { TResponseRedux } from "../../../types/global";
import { TStuedent } from "../../../types/user.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllStudents: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((element: TAcademicSemisterQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStuedent[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
          error: response?.error,
        };
      },
    }),

    createStudent: builder.mutation({
      query: payload => ({
        url: "/users/create-student",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
