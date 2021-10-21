import { createContext, useReducer, Reducer, FunctionComponent } from "react";

export type QuizResult = {
  question: string;
  valid: boolean;
};

export enum QuizActionName {
  QUIZ_ANSWER = "QUIZ_ANSWER",
  QUIZ_RESET = "QUIZ_RESET",
}

export type QuizState = {
  answers: Array<QuizResult>;
  quizAnswer: (question: string, valid: boolean) => void;
  quizReset: () => void;
};

export type TypeQuizAction = {
  type: QuizActionName;
  payload: QuizState;
};

const initialState: QuizState = {
  answers: [],
  quizAnswer: () => {},
  quizReset: () => {},
};

export const QuizContext = createContext(initialState);

const quizReducer = (state: QuizState, action: TypeQuizAction) => {
  const { type, payload } = action;

  switch (type) {
    case QuizActionName.QUIZ_ANSWER:
      return {
        ...state,
        answers: [...state.answers, payload],
      };
    case QuizActionName.QUIZ_RESET:
      return {
        ...state,
        answers: [],
      };
    default:
      return state;
  }
};

export const QuizProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    quizReducer,
    initialState
  );

  const quizAnswer = (question: string, valid: boolean) => {
    dispatch({
      type: QuizActionName.QUIZ_ANSWER,
      payload: { question, valid } as QuizResult,
    });
  };

  const quizReset = () => {
    dispatch({
      type: QuizActionName.QUIZ_RESET,
    });
  };

  return (
    <QuizContext.Provider
      value={{
        answers: state.answers,
        quizAnswer,
        quizReset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
