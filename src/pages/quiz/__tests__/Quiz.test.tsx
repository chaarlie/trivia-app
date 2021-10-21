import { render, waitFor } from "@testing-library/react";

import axios from "axios";

import Quiz from "../Quiz";

beforeEach(() => {
  axios.get = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Quiz", () => {
  it("should render properly the component", async () => {
    const data = {
      data: {
        results: [
          {
            category: "Entertainment: Comics",
            type: "boolean",
            difficulty: "hard",
            question:
              "In the comic book &quot;Archie&quot;, Betty is friends with Veronica because she is rich.",
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

    expect(getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => getByTestId("trivia-content"));
  });

  it("should not render the component if the data did  not load ", async () => {
    const data = {
      data: {
        results: [],
      },
    };

    (axios.get as unknown as jest.Mock<{}>).mockImplementationOnce(() =>
      Promise.resolve(data)
    );

    const { getByTestId, queryByTestId } = render(<Quiz />);

    expect(getByTestId("loading")).toBeInTheDocument();

    waitFor(() => queryByTestId("trivia-content"));

    expect(queryByTestId("trivia-content")).toBeNull();
  });
});
