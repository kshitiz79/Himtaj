// src/features/deals/dealsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from "../../../utils/baseURL";

export const dealsApi = createApi({
  reducerPath: "dealsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/deal`,
  }),
  tagTypes: ["Deal"],
  endpoints: (builder) => ({
    fetchDeal: builder.query({
      query: () => "/",
      providesTags: ["Deal"],
    }),
    updateDeal: builder.mutation({
      query: (dealData) => ({
        url: "/",
        method: "PUT",
        body: dealData,
      }),
      invalidatesTags: ["Deal"],
    }),
  }),
});

export const { useFetchDealQuery, useUpdateDealMutation } = dealsApi;
export default dealsApi;
