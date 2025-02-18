import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
//
//
const usersAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.name.localeCompare(a.name),
});
const initialState_users = usersAdapter.getInitialState();
//

const followsAdapter = createEntityAdapter({
  selectId: (data) => `${data.followerId}${data.followingId}`,
});
const initialState_follows = followsAdapter.getInitialState();

let data1;
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signUp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (res) => usersAdapter.setAll(initialState_users, res),
      providesTags: ["User"],
      // providesTags: (result, arg, error) => [
      //   { type: "User", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "User", id })),
      // ],
    }),
    fetchUserById: builder.query({
      query: (email) => `/user/${email}`,
    }),
    getAllFollows: builder.query({
      query: () => ({
        url: "/follows",
        method: "GET",
      }),
      transformResponse: (res) =>
        followsAdapter?.setAll(initialState_follows, res),
      providesTags: (result, error, arg) =>
        result
          ? [...result?.ids?.map((id) => ({ type: "Follow", id }))]
          : ["Follows"],
    }),
    sendEmailVerification: builder.mutation({
      query: (userId) => ({
        url: `/send_verification_link/${userId}`,
        // url: "/send_verification_link",
        // method: "POST",
        method: "GET",
        // body: userId,
      }),
    }),
    isEmailVerified: builder.query({
      query: (userId) => `/${userId}/isEmailVerified`,
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: `/follows`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData(
            "getAllFollows",
            undefined,
            (draft) => {
              const followsObject = draft.entities[data?.id];
              if (followsObject) {
                followsAdapter.removeOne(draft, data?.id);
              }
              if (!followsObject) {
                followsAdapter.addOne(draft, data);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },
    }),
  }),
});
const selectUsersResponse = usersApiSlice.endpoints.getUsers.select();

const selectUsersResponseData = createSelector(
  selectUsersResponse,
  (response) => response.data
);
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectAllUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersResponseData(state) ?? initialState_users
);
const selectFollowsResponse = usersApiSlice.endpoints.getAllFollows.select();
const selectFollowsResponseData = createSelector(
  selectFollowsResponse,
  (res) => res.data
);
export const {
  selectAll: selectAllFollows,
  selectById: selectFollowsById,
  selectIds: selectAllFollowsId,
} = followsAdapter.getSelectors(
  (state) => selectFollowsResponseData(state) ?? initialState_follows
);

export const {
  useFetchUserByIdQuery,
  useCreateUserMutation,
  useSendEmailVerificationMutation,
  useIsEmailVerifiedQuery,
  useLazyIsEmailVerifiedQuery,
  useGetAllFollowsQuery,
  useFollowUserMutation,
} = usersApiSlice;
