import React from "react";
import { ReplyComment } from "./ReplyComment";
import { LikeComment } from "./LikeComment";
import { BroadcastComment } from "./BroadcastComment";
import styled from "styled-components";

//
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Interactions_Comment = () => {
  return (
    <Layout>
      <ReplyComment />
      <BroadcastComment />
      <LikeComment />
    </Layout>
  );
};
