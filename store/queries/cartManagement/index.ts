"use client";

import { baseApi } from "../base";
import { endpointAuth, endpointCart } from "@/helpers/enpoints";

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
    getCart: build.query<any, { id: string }>({
      query: (params) => ({
        url: endpointCart.GET_CURRENT_CART.replace("{id}", params.id),
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    addCard: build.mutation({
      query: (body) => ({
        url: endpointCart.ADD_CART,
        body: body,
        method: "POST",
        flashError: true,
      }),
    }),
    deleteCard: build.mutation({
      query: (id) => ({
        url: endpointCart.DELETE_CART.replace("{id}", id),
        body: undefined,
        method: "POST",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useVerifyTokenMutation,
  useGetCartQuery,
  useAddCardMutation,
  useDeleteCardMutation,
} = authAPI;
