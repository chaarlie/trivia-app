import styled from "styled-components";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  opacity: 0.7;
  text-transform: uppercase;
  border: none;
  font-size: inherit;
  background-color: inherit;
  width: 60%;
  display: inline-block;
  align-self: center;
  &:hover {
    background-color: #d9d9d9;
  }
  &:active {
    color: #faf8f7;
    background-color: #bfbfbf;
    padding-top: 1%;
    font-size: 95%;
  }
`;

const StyledHeading = styled.h3`
  align-self: center;
  text-align: center;
`;

export { StyledButton, StyledPageContainer, StyledHeading };
