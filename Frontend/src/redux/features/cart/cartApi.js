import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/cart`,
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Cart"],
    }),
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: "/add",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"], // This will trigger the cart to refetch
    }),
    
    updateCartItem: builder.mutation({
      query: ({ id, type }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { type },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeItemFromCart: builder.mutation({
      query: (id) => ({
        url: `/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/clear/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemMutation, // Ensure this is exported
  useRemoveItemFromCartMutation,
  useClearCartMutation,
} = cartApi;

export default cartApi;
