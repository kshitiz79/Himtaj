import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/product`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
        const queryParams = new URLSearchParams({
          ...(category && { category }),
          ...(color && { color }),
          ...(minPrice && { minPrice: minPrice.toString() }),
          ...(maxPrice && { maxPrice: maxPrice.toString() }),
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        return `/?${queryParams}`;
      },
      providesTags: ["Products"],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    fetchTrendingProducts: builder.query({
      query: () => `/trending`,
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    fetchRelatedBlogs: builder.query({
      query: (id) => `blogs/related/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // New endpoint for searching products
    searchProducts: builder.query({
      query: (searchTerm) => ({
        url: `/search`,
        params: { query: searchTerm },
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useFetchTrendingProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedBlogsQuery,
  useSearchProductsQuery, // Export the new search query
} = productsApi;

export default productsApi;
