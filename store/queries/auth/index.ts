"use client";

import { baseApi } from "../base";

import { endpointAuth } from "@/helpers/enpoints";

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
    verifyEmail: build.mutation({
      query: ({ email }: { email: string }) => ({
        url: endpointAuth.EMAIL,
        method: "POST",
        body: { email },
        flashError: true,
      }),
    }),
    signIn: build.mutation({
      query: (data: {
        email: string;
        password: string;
        isRemember: boolean;
      }) => ({
        url: endpointAuth.SIGN_IN,
        method: "POST",
        body: data,
        flashError: true,
      }),
    }),
    signUp: build.mutation({
      query: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => ({
        url: endpointAuth.SIGN_UP,
        method: "POST",
        body: data,
        flashError: true,
      }),
    }),
    loginGoogle: build.mutation({
      query: (data: { accessToken?: string }) => ({
        url: endpointAuth.LOGIN_GOOGLE,
        method: "POST",
        body: data,
        flashError: true,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyTokenMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useLoginGoogleMutation,
} = authAPI;
