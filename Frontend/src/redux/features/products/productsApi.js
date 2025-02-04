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
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        // Add these fields if your server supports them
        gender,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => {
        const queryParams = new URLSearchParams({
          ...(gender ? { gender } : {}), // Only include gender if defined
          ...(category ? { category } : {}),
          ...(color ? { color } : {}),
          ...(minPrice !== undefined ? { minPrice: minPrice.toString() } : {}),
          ...(maxPrice !== undefined ? { maxPrice: maxPrice.toString() } : {}),
          page: page.toString(),
          limit: limit.toString(),
          sortBy,        // e.g., "price", "createdAt", etc.
          sortOrder,     // e.g., "asc" or "desc"
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
        credentials: "include",
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
  useSearchProductsQuery,
} = productsApi;

export default productsApi;
