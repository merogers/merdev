import React from "react";
import styled from "styled-components";

// --- Components --- //

export const ErrorMsg = ({ msg }) => {
  return <StyledErrorMsg>{msg}</StyledErrorMsg>;
};

export const WarningMsg = ({ msg }) => {
  return <StyledWarningMsg>{msg}</StyledWarningMsg>;
};

export const StatusMsg = ({ msg }) => {
  return <StyledStatusMsg>{msg}</StyledStatusMsg>;
};

export const LoadingMsg = ({ msg }) => {
  return <StyledLoadingMsg>{msg}</StyledLoadingMsg>;
};

// ---  Styles --- //

const StyledMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 25px auto 0px auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const StyledErrorMsg = styled(StyledMsg)`
  color: ${(props) => props.theme.error};
`;

const StyledWarningMsg = styled(StyledMsg)`
  color: ${(props) => props.theme.warning};
`;

const StyledStatusMsg = styled(StyledMsg)`
  color: ${(props) => props.theme.secondary};
`;

const StyledLoadingMsg = styled(StyledMsg)`
  color: ${(props) => props.theme.secondary};
`;
