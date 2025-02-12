import { createSelector, createEntityAdapter, current } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";
import { useEffect } from "react";
//
//

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = postsAdapter.getInitialState();

//

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: "posts" }),
      /* transformResponse is just for storing or editing our  data*/
      transformResponse: (response) => {
        return postsAdapter.upsertMany(initialState, response);
      },

      // providesTags: (result, error, arg) => [
      //   { type: "Post", id: "LIST" },
      //   ...result?.ids.map((id) => ({ type: "Post", id: id })),
      // ],
      providesTags: (result, error, arg) =>
        result
          ? [...result?.ids.map((id) => ({ type: "Post", id })), "Post"]
          : ["Post"],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
      // transformResponse: (response) => {
      //   return postsAdapter.upsertOne(initialState, response);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "SinglePost", id: "arg" },
      //   // ...result.map((id) => ({ type: "Comment", id:arg })),
      // ],
      providesTags: (result, error, arg) =>
        result ? [{ type: "SinglePost", id: arg }] : ["SinglePost"],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `posts/userId/${id}`,
      transformResponse: (res) => {
        console.log(res);
        return postsAdapter.upsertMany(initialState, res);
      },
      // providesTags: (result, error, arg) => ({ type: "Post", id: "arg" }),
      // ...result.ids.map((id) => ({ type: "Post", id })),
    }),
    // getAllInteractionsByUserId: builder.query({
    //   async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
    //     // get posts By user..
    //     const result = await fetchWithBQ(`posts/?userId=${_arg}`);
    //     return result.data ? { data: result.data } : { error: result.error };
    //   },
    // }),
    addNewPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    editPost: builder.mutation({
      query: ({ id, content }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: { body: content },
      }),
      invalidatesTags: (result, arg, error) => [
        {
          type: "Post",
          id: result.id,
        },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    postBroadcasted: builder.mutation({
      query: (data) => ({
        url: "/broadcastPost",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        // { postId, visitorId },
        data,
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const thePost = draft.entities[data.ogPostId];
            const checker = thePost?.broadcasts?.findIndex(
              (broadcast) => broadcast.id == data.id
            );

            console.log(current(thePost));
            console.log(checker);
            if (checker == -1) {
              thePost.broadcasts.push(data);
              console.log(current(thePost));
            }
            if (checker > -1) {
              thePost.broadcasts.splice(checker, 1);
            }
          })
        );
        try {
          await queryFulfilled;
          console.log(queryFulfilled);
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },
    }),
    postUnBroadcasted: builder.mutation({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    postLiked: builder.mutation({
      query: (data) => ({
        url: `likes`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const thePost = draft.entities[data.postId];
            const checker = thePost?.likes?.findIndex(
              (broadcast) => broadcast.id == data.id
            );
            console.log(current(thePost));
            console.log(checker);
            if (checker == -1) {
              thePost.likes.push(data);
            }
            if (checker > -1) {
              thePost.likes.splice(checker, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },
    }),
    getCommentCount: builder.query({
      query: (postId) => `post/${postId}/comment_count`,
    }),
  }),
});
// the comments in the object belfow is how we
// would rename the methods if we wanted to

export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

// memoized selector
export const selectPostsData = createSelector(
  selectPostsResult,
  (response) => response.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectAllPostsId,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

//
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  usePostLikedMutation,
  usePostBroadcastedMutation,
  usePostUnBroadcastedMutation,
  useGetAllInteractionsByUserIdQuery,
  useGetCommentCountQuery,
  // useAddCommmentMutation,
  // useGetCommentsQuery,
} = postsApiSlice;
