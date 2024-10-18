"use client";

import { baseApi } from "../base";

import { FilterProduct } from "@/types/filters-types";
import { endpointOrder } from "@/helpers/enpoints";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.mutation<any, FilterProduct>({
      query: (params: FilterProduct) => ({
        url: endpointOrder.GET_ALL_ORDER,
        method: "POST",
        body: params,
        flashError: true,
      }),
    }),
    getOrder: build.query<any, { id: string }>({
      query: (params: { id: string }) => ({
        url: endpointOrder.GET_ORDER.replace("{id}", params?.id),
        method: "GET",
        flashError: true,
      }),
    }),
    getOrderDetail: build.query<any, { code: string }>({
      query: (params: { code: string }) => ({
        url: endpointOrder.GET_DETAIL_ORDER.concat(`?code=${params.code}`),
        method: "GET",
        flashError: true,
      }),
    }),
    changeStatus: build.mutation<
      any,
      {
        orderCode: string;
        status: string;
      }
    >({
      query: (body: { orderCode: string; status: string }) => ({
        url: endpointOrder.CHANGE_STATUS,
        method: "POST",
        body: body,
        flashError: true,
      }),
    }),
    addOrder: build.mutation<
      any,
      {
        id?: string;
        name?: string;
        order: {
          id?: string;
          items: {
            quantity: number;
            customCanvasId: string;
            size: string;
          }[];
          address: string;
          recipientPhone: string;
          recipientMail: string;
          recipientName: string;
          voucherCode: string;
        };
        paymentMethod: string;
        returnUrl: string;
      }
    >({
      query: (body: {
        id?: string;
        order: {
          id?: string;
          items: {
            quantity: number;
            customCanvasId: string;
            size: string;
          }[];
          address: string;
          recipientPhone: string;
          recipientMail: string;
          recipientName: string;
          voucherCode: string;
        };
        paymentMethod: string;
        returnUrl: string;
      }) => ({
        url: endpointOrder.ADD_NEW_ORDER,
        method: "POST",
        body: body,
        flashError: true,
      }),
    }),
  }),
});

export const {
  useGetAllOrderMutation,
  useAddOrderMutation,
  useGetOrderQuery,
  useGetOrderDetailQuery,
  useChangeStatusMutation,
} = authAPI;
