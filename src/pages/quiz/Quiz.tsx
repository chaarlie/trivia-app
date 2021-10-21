import { useState, useEffect, useContext, FunctionComponent } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import decodeHTML from "../../util/decodeHTML";

import { StyledPageContainer } from "../../common-components";
import { QuizContext } from "../../context/QuizContext";
import TriviaContent from "./TriviaContent";

const API_URL = "/api.php?amount=10&difficulty=hard&type=boolean";

export type Question = {
  category: string;
  question: string;
  correct_answer: "True" | "False";
};

export type Result = {
  response_code: number;
  results: Array<Question>;
};

export const Quiz: FunctionComponent = () => {
  const [networkError, setNetworkError] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const history = useHistory();

  const { quizAnswer } = useContext(QuizContext);

  const handleSelection = (question: string, valid: boolean) => {
    quizAnswer(question, valid);

    if (questionIndex === questions.length - 1) {
      history.push("/results");
    }

    setQuestionIndex((idx) => idx + 1);
  };

  const handleTruthyAnswer = (question: string, correctAnswer: string) => {
    handleSelection(question, correctAnswer === "True");
  };

  const handleFalsyAnswer = (question: string, correctAnswer: string) => {
    handleSelection(question, correctAnswer === "False");
  };

  useEffect(() => {
    const parseQuestions = (questions: Question[]): Question[] => {
      return questions.map(
        (element) =>
          ({
            ...element,
            category: decodeHTML(element.category),
            question: decodeHTML(element.question),
          } as Question)
      );
    };
    const fetchQuestions = async () => {
      try {
        const json = await axios.get<Result>(API_URL);
        let loadedQuestions = json.data.results || [];
        setQuestions(parseQuestions(loadedQuestions));
      } catch (err: any) {
        setNetworkError(err.message);
      }
    };
    fetchQuestions();
  }, []);

  if (networkError) {
    return <p data-testid="network-error">Network error: {networkError}</p>;
  }

  return questions.length > 0 ? (
    <StyledPageContainer data-testid="trivia-content">
      <TriviaContent
        {...questions[questionIndex]}
        handleTruthyAnswer={handleTruthyAnswer}
        handleFalsyAnswer={handleFalsyAnswer}
      />
    </StyledPageContainer>
  ) : (
    <p data-testid="loading">Loading...</p>
  );
};

export default Quiz;
