import React from "react";
import styled from "styled-components";

//

const Layout = styled.div`
  display: none;
`;
export const GeneralSettings_Tab = ({ displayedTab }) => {
  return <Layout display={displayedTab.toString()}>GeneralSettings_Tab</Layout>;
};
