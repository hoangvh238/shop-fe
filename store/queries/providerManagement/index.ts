"use client";

import { baseApi } from "../base";

import { endpointProvider } from "@/helpers/enpoints";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getColors: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointProvider.GET_COLORS.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
    getSizes: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointProvider.GET_SIZES.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useGetColorsQuery, useGetSizesQuery } = authAPI;
