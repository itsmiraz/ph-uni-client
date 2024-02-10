import { baseApi } from "../../api/baseApi";

const semesterManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getAllRegisteredSemsters: builder.query({
    //   query: args => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((element: TAcademicSemisterQueryParam) => {
    //         params.append(element.name, element.value as string);
    //       });
    //     }

    //     return {
    //       url: "/students",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TStuedent[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response?.meta,
    //       error: response?.error,
    //     };
    //   },
    // }),

    semesterRegister: builder.mutation({
      query: payload => ({
        url: "/semister-registration/create-semister-registration",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSemesterRegisterMutation } = semesterManagementApi;
