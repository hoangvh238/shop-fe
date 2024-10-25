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
    addSubProduct: build.mutation<
      any,
      {
        id?: string;
        name: string;
        content?: string;
        images: string[];
        lensVRUrl?: string;
        canvasCode?: string;
        isPublic?: boolean;
        price: number;
        color: string;
        sizes: string;
        authorId?: string;
        templateId?: string;
      }
    >({
      query: (params: {
        id?: string;
        name: string;
        content?: string;
        images: string[];
        lensVRUrl?: string;
        canvasCode?: string;
        isPublic?: boolean;
        price: number;
        color: string;
        sizes: string;
        authorId?: string;
        templateId?: string;
      }) => ({
        url: endpointProduct.ADD_NEW_SUBPRODUCT,
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
    getSubProduct: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointProduct.GET_SUBPRODUCT.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
    seftEdit: build.mutation<any, { id?: string }>({
      query: (params: { id?: string }) => ({
        url: endpointProduct.SEFT_EDIT.replace("{id}", params?.id ?? ""),
        method: "GET",
        flashError: true,
      }),
    }),
    deleteProduct: build.mutation<any, { id?: string }>({
      query: (params: { id: string }) => ({
        url: endpointProduct.DELETE_PRODUCT.replace("{id}", params?.id),
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
    deleteSubProduct: build.mutation<any, { id: string }>({
      query: (params: { id?: string }) => ({
        url: endpointProduct.DELETE_SUBPRODUCT.replace(
          "{id}",
          params?.id ?? "",
        ),
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
    fillterProduct: build.mutation<
      any,
      {
        filter: {
          priceRange: {
            minPrice: number;
            maxPrice: number;
          };
          color: string;
          sizes: string;
        };
        skip: number;
        pageIndex: number;
        pageSize: number;
        sortField: string;
        asc: boolean;
      }
    >({
      query: (body: {
        filter: {
          priceRange: {
            minPrice: number;
            maxPrice: number;
          };
          color: string;
          sizes: string;
        };
        skip: number;
        pageIndex: number;
        pageSize: number;
        sortField: string;
        asc: boolean;
      }) => ({
        url: endpointProduct.FILLTER_PRODUCT,
        method: "POST",
        body: body,
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
  useAddSubProductMutation,
  useGetSubProductQuery,
  useDeleteProductMutation,
  useDeleteSubProductMutation,
  useFillterProductMutation,
  useSeftEditMutation,
} = authAPI;
