import { FunctionComponent } from "react";

import styled from "styled-components";

import { QuizResult } from "../../context/QuizContext";

const StyledResultMark = styled.span`
  font-size: 150%;
  padding-right: 15px;
`;

const StyledListItem = styled.li`
  margin-top: 10px;
  list-style-type: none;
`;

const QuestionResult: FunctionComponent<QuizResult> = ({ question, valid }) => {
  const mark = valid ? "+" : "-";
  return (
    <StyledListItem data-testid="result-block">
      <StyledResultMark data-testid="result-mark">{mark}</StyledResultMark>{" "}
      {question}
    </StyledListItem>
  );
};

export default QuestionResult;
