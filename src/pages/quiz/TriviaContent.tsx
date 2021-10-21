import { FunctionComponent } from "react";
import styled from "styled-components";

import { StyledButton, StyledHeading } from "../../common-components";

const StyledButtonSection = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledQuestionContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 100px 30px;
  text-align: center;
`;

export type TriviaProps = {
  category: string;
  question: string;
  correct_answer: string;
  handleTruthyAnswer: (question: string, correct_answer: string) => void;
  handleFalsyAnswer: (question: string, correct_answer: string) => void;
};

const TriviaContent: FunctionComponent<TriviaProps> = ({
  category,
  question,
  correct_answer,
  handleTruthyAnswer,
  handleFalsyAnswer,
}) => (
  <>
    <StyledHeading data-testid="category">{category}</StyledHeading>
    <StyledQuestionContainer data-testid="question">
      {question}
    </StyledQuestionContainer>
    <StyledButtonSection>
      <StyledButton
        data-testid="answer-true"
        onClick={() => handleTruthyAnswer(question, correct_answer)}
      >
        True
      </StyledButton>
      <StyledButton
        data-testid="answer-false"
        onClick={() => handleFalsyAnswer(question, correct_answer)}
      >
        False
      </StyledButton>
    </StyledButtonSection>
  </>
);

export default TriviaContent;
