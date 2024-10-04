"use client";

import { baseApi } from "../base";

import { FilterProduct } from "@/types/filters-types";
import { endpointAuth, endpointProduct } from "@/helpers/enpoints";

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
    getAllProduct: build.mutation<any, FilterProduct>({
      query: (params: FilterProduct) => ({
        url: endpointProduct.GET_ALL_PRODUCT,
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
    getProduct: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointProduct.GET_PRODUCT.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
    getAllSubProduct: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointProduct.GET_ALL_SUBPRODUCT.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
    addProduct: build.mutation<
      any,
      {
        id?: string;
        name: string;
        descriptions: string;
        images: string[] | never[];
        templateCode: string;
        content: Object;
        providerId?: string;
      }
    >({
      query: (params: {
        id?: string;
        name: string;
        descriptions: string;
        images: string[] | never[];
        templateCode: string;
        content: Object;
        providerId?: string;
      }) => ({
        url: endpointProduct.ADD_NEW_PRODUCT,
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
  }),
});

export const {
  useVerifyTokenMutation,
  useGetAllProductMutation,
  useGetProductQuery,
  useAddProductMutation,
  useGetAllSubProductQuery,
} = authAPI;
