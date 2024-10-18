import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { constants } from "@/settings";
import webStorageClient from "@/utils/webStorageClient";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.API_SERVER,
  prepareHeaders: (headers) => {
    const accessToken = webStorageClient.getToken();

    headers.set("Content-Type", "application/json");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },

});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
