import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import axios from "axios";

import TriviaContent, { TriviaProps } from "../TriviaContent";
import Quiz from "../Quiz";

beforeEach(() => {
  axios.get = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("TriviaContent", () => {
  it("should render properly the component", () => {
    const props: TriviaProps = {
      category: "Entertainment: Video Games",
      correct_answer: "True",
      question:
        "The Paradox Interactive game &quot;Stellaris&quot; was released in 2016.",
      handleFalsyAnswer: () => {},
      handleTruthyAnswer: () => {},
    };

    const { getByTestId } = render(<TriviaContent {...props} />);

    expect(getByTestId("category")).toHaveTextContent(props.category);
    expect(getByTestId("question")).toHaveTextContent(props.question);
  });

  it("should render empty elements", () => {
    const props: TriviaProps = {
      category: "",
      correct_answer: "True",
      question: "",
      handleFalsyAnswer: () => {},
      handleTruthyAnswer: () => {},
    };

    const { getByTestId } = render(<TriviaContent {...props} />);

    expect(getByTestId("category")).toHaveTextContent("");
    expect(getByTestId("question")).toHaveTextContent("");
  });

  it("should trigger next question", async () => {
    let expectedStr1 = null;
    let expectedStr2 = null;

    const data = {
      data: {
        results: [
          {
            category: "Entertainment: Comics",
            type: "boolean",
            difficulty: "hard",
            question:
              "In the comic book Archie, Betty is friends with Veronica because she is rich.",
            correct_answer: "False",
            incorrect_answers: ["True"],
          },
          {
            category: "Entertainment: Japanese Anime & Manga",
            type: "boolean",
            difficulty: "hard",
            question:
              "Throughout the entirety of Dragon Ball Z, Goku only kills two characters: a miniboss named Yakon and Kid Buu.",
            correct_answer: "True",
            incorrect_answers: ["False"],
          },
          {
            category: "Science: Computers",
            type: "boolean",
            difficulty: "hard",
            question:
              "The IBM PC used an Intel 8008 microprocessor clocked at 4.77 MHz and 8 kilobytes of memory.",
            correct_answer: "False",
            incorrect_answers: ["True"],
          },
        ],
      },
    };
    (axios.get as jest.Mocked<any>).mockImplementationOnce(() =>
      Promise.resolve(data)
    );

    const { getByTestId } = render(<Quiz />);

    await waitFor(() => getByTestId("trivia-content"));

    const buttonTrue = getByTestId("answer-true");
    const buttonFalse = getByTestId("answer-true");

    act(() => {
      fireEvent.click(buttonTrue);
    });

    expectedStr1 = data.data.results[1].category;
    expectedStr2 = data.data.results[1].question;

    expect(getByTestId("category")).toHaveTextContent(expectedStr1);
    expect(getByTestId("question")).toHaveTextContent(expectedStr2);

    act(() => {
      fireEvent.click(buttonFalse);
    });

    expectedStr1 = data.data.results[2].category;
    expectedStr2 = data.data.results[2].question;

    expect(getByTestId("category")).toHaveTextContent(expectedStr1);
    expect(getByTestId("question")).toHaveTextContent(expectedStr2);
  });
});
