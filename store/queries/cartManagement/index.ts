"use client";

import { baseApi } from "../base";

import { endpointCart } from "@/helpers/enpoints";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<any, any>({
      query: () => ({
        url: endpointCart.GET_CART,
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

export const { useGetCartQuery, useAddCardMutation, useDeleteCardMutation } =
  authAPI;
