import { apiSlice } from "../api/apiSlice";
import { createSelector, createEntityAdapter, current } from "@reduxjs/toolkit";
//

//
//
export const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.timeStamp),
});
export const initialCommentsState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => ({
        url: `${postId}/comments`,
        method: "GET",
      }),
      transformResponse: (res, meta, arg) => {
        return commentsAdapter.upsertMany(initialCommentsState, res);
      },
      providesTags: (result, error, arg) => [{ type: "Comment", id: arg }],
    }),
    addCommment: builder.mutation({
      query: (data) => ({
        url: `posts/${data.postId}/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.postId },
      ],
    }),
    getCommentById: builder.query({
      query: (commentId) => ({
        url: `comment/${commentId}`,
        method: "GET",
      }),
      providesTags: (res, meta, arg) => [{ type: "SingleComment", id: arg }],
    }),
    getChildCommentCount: builder.query({
      query: (commentId) => `/comment/${commentId}/comment_count`,
    }),

    broadcastComment: builder.mutation({
      query: (data) => ({
        url: "/broadcast_comment",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApiSlice.util.updateQueryData(
            "getComments",
            data.postId,
            (draft) => {
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
            }
          )
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
    likeComment: builder.mutation({
      query: (data) => ({
        url: `/like_comment`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApiSlice.util.updateQueryData(
            "getComments",
            data.postId,
            (draft) => {
              let theComment = draft.entities[data.commentId];
              const checker = theComment?.likes?.findIndex(
                (like) => like.id == data.id
              );

              if (checker == -1) {
                theComment.likes.push(data);
              }
              if (checker > -1) {
                theComment.likes.splice(checker, 1);
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
    like_BC_COMMENT: builder.mutation({
      query: (data) => ({
        url: "/like_comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, meta, arg) => [
        { type: "SingleComment", id: arg.commentId },
      ],
    }),
    getLikeCount: builder.query({
      query: () => `comment/${id}/like_count`,
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommmentMutation,
  useGetCommentByIdQuery,
  useLikeCommentMutation,
  useGetChildCommentCountQuery,
  useBroadcastCommentMutation,
  useGetLikeCountQuery,
  useLike_BC_COMMENTMutation,
} = commentsApiSlice;
