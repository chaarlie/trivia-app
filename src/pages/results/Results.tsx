import { FunctionComponent, useContext } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import {
  StyledButton,
  StyledHeading,
  StyledPageContainer,
} from "../../common-components";
import QuestionResult from "./QuestionResult";
import { QuizContext, QuizResult } from "../../context/QuizContext";

const ResultBlock = styled.ul`
  height: inherit;
  overflow-y: scroll;
  margin: 20px 0;
  opacity: 0.6;
  font-size: 90%;
`;

const Results: FunctionComponent = () => {
  const { answers, quizReset } = useContext(QuizContext);

  const score = answers.filter(({ valid }: QuizResult) => valid).length;

  const history = useHistory();

  const handlePlayAgain = () => {
    quizReset();
    history.push("/");
  };
  return (
    <StyledPageContainer>
      <StyledHeading data-testid="result-score">
        {" "}
        You scored {score} / {answers.length}
      </StyledHeading>

      <ResultBlock>
        {answers.map((answer, i) => (
          <QuestionResult key={i} {...answer} />
        ))}
      </ResultBlock>

      <StyledButton onClick={handlePlayAgain}> Play again?</StyledButton>
    </StyledPageContainer>
  );
};

export default Results;
