import { parseISO, formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import React from "react";

//
const Layout = styled.span`
  display: flex;
  width: auto;
  font-size: 0.75em;
  opacity: 0.35;
  font-style: italic;
  margin-right: 10px;
`;
//
export const TimeAgo = ({ timeStamp }) => {
  let timeAgo = "";
  if (timeStamp) {
    const dateTimePosted = parseISO(timeStamp);
    const howLongAgo = formatDistanceToNow(dateTimePosted);
    timeAgo = `${howLongAgo} ago`;
  }
  return <Layout>{timeAgo}</Layout>;
};
