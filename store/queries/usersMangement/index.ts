"use client";

import { endpointAuth, endpointUsersManagement } from "@/helpers/enpoints";
import { baseApi } from "../base";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    verifyToken: build.mutation({
      query: (token: string) => ({
        url: endpointAuth.VERIFY_TOKEN,
        method: "POST",
        body: { token },
        flashError: true,
      }),
    }),
    getAllUsers: build.query<
      any,
      { page: number; page_size: number; search: string }
    >({
      query: (params) => ({
        url: endpointUsersManagement.GET_ALL_USERS,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useVerifyTokenMutation, useGetAllUsersQuery } = authAPI;
