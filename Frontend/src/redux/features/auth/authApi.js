import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${getBaseUrl()}/api/auth`,
      credentials: "include",

    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
      registerUser: builder.mutation({
        query: (newUser) => ({
          url: "/register",
          method: "POST",
          body: newUser,
        }),
      }),
      loginUser: builder.mutation({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }),

      sendOtp: builder.mutation({
        query: (email) => ({
          url: "/send-otp",
          method: "POST",
          body: { email },
        }),
      }),
      // Verify OTP
      verifyOtp: builder.mutation({
        query: (data) => ({
          url: "/verify-otp",
          method: "POST",
          body: data, // { email, otp }
        }),
      }),
      logoutUser: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
      }),
      getUser: builder.query({
        query: () => ({
          url: "/users",
          method: "GET",
        }),
        refetchOnMount: true,
        invalidatesTags: ["User"],
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),
      updateUserRole: builder.mutation({
        query: ({ userId, role }) => ({
          url: `/users/${userId}`,
          method: "PUT",
          body: { role },
        }),
        refetchOnMount: true,
        invalidatesTags: ["User"],
      }),
      editProfile: builder.mutation({
        query: (profileData) => ({
          url: '/edit-profile',
          method: 'PATCH',
          body: profileData,
        }),
      }),
    }),
  });
  
  export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useEditProfileMutation
  } = authApi;
  
  export default authApi;





// 1. Setting up authApi using Redux Toolkit's createApi for managing authentication-related API requests.


// 2. Using fetchBaseQuery to configure the base URL for all API requests and include credentials (cookies/tokens).

// 3. Dynamic base URL is retrieved from getBaseUrl() for flexibility in different environments.

// 4. Defining registerUser mutation to handle user registration via a POST request.
// 5. Defining loginUser mutation to authenticate users via a POST request.

// 6. Defining logoutUser mutation to log out the user by sending a POST request.

// 7. Defining getUser query to fetch the current user's data with GET, refetches on mount and invalidates cache on user changes.

// 8. Defining deleteUser mutation to remove a user via a DELETE request by userId.

// 9. Defining updateUserRole mutation to change a user's role with PUT, refetches on mount and invalidates cache on user changes.

// 10. Defining editProfile mutation to update the user's profile via a PATCH request.

// 11. Auto-generated hooks like useRegisterUserMutation, useLoginUserMutation, and useGetUserQuery for easy integration in components.

// 12. Exporting authApi for inclusion in Redux store and enabling API calls across the app.

