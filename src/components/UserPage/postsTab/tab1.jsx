import React from "react";
import { PostCard } from "../../PostCard1/PostCard";
import { createContext } from "react";
import { useGetPostsByUserIdQuery } from "../../../features/posts/postsApiSlice";
import { useParams } from "react-router-dom";
import { useGetAllInteractionsByUserIdQuery } from "../../../features/posts/postsApiSlice";
import styled from "styled-components";
//
//
export const EachByUserPostContext = createContext();
//

export const StyledTab = styled.div`
  padding: 0 auto;
  align-self: center;
  display: ${(props) => (props.displayTab ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
`;
export const Tab1 = ({ displayTab }) => {
  const { userId } = useParams();
  // const { data: data1, error } = useGetAllInteractionsByUserIdQuery(userId);
  // console.log(data1);
  // console.log(error);
  console.log(userId);

  const { data } = useGetPostsByUserIdQuery(userId);

  const userPosts = data?.ids?.map((id) => (
    <EachByUserPostContext.Provider key={id} value={{ postId: id }}>
      <PostCard key={id} postIdProp={id} />
    </EachByUserPostContext.Provider>
  ));

  console.log(data);
  //
  return <StyledTab displayTab={displayTab}>{userPosts}</StyledTab>;
};
