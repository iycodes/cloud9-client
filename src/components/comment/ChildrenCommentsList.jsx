import React from "react";
import { CommentCard } from "./CommentCard";
import styled, { ThemeProvider } from "styled-components";

//

const Layout = styled.div`
  display: ${(props) => (props.showChildren ? "flex" : "none")};
  flex-direction: column;
  margin-left: 5px;
  margin-bottom: 7px;
  width: 100%;
  flex-direction: column;
`;

export const ChildrenCommentsList = ({
  childrenComments,
  showChildrenProps,
}) => {
  return (
    <Layout showChildren={showChildrenProps}>
      {childrenComments?.map((childComment) => (
        <CommentCard key={childComment?.id} eachComment={childComment} />
      ))}
    </Layout>
  );
};
