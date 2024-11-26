import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL"; // Adjust the path as needed

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/coupon`,
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    fetchCoupons: builder.query({
      query: () => "/",
      providesTags: ["Coupon"],
    }),
    addCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/add",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["Coupon"],
    }),
    validateCoupon: builder.mutation({
      query: (code) => ({
        url: "/validate",
        method: "POST",
        body: { code },
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useFetchCouponsQuery,
  useAddCouponMutation,
  useValidateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

export default couponApi;
