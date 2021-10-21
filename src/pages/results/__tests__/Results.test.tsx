import { render } from "@testing-library/react";

import { QuizContext, QuizState } from "../../../context/QuizContext";

import Results from "../Results";

describe("Reults", () => {
  it("should display valid answers with their sign and the score", () => {
    const initialState: QuizState = {
      answers: [
        {
          valid: true,
          question:
            "In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.",
        },
        {
          valid: false,
          question:
            "Joseph Stalin's real name was Ioseb Bessarionis dze Dzugashvili.",
        },
        {
          valid: true,
          question:
            "In the comic book 'Archie', Betty is friends with Veronica because she is rich.",
        },
        {
          valid: false,
          question:
            "TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        },
        {
          valid: true,
          question:
            "Throughout the entirety of 'Dragon Ball Z', Goku only kills two characters: a miniboss named Yakon and Kid Buu.",
        },
        {
          valid: false,
          question:
            "The IBM PC used an Intel 8008 microprocessor clocked at 4.77 MHz and 8 kilobytes of memory.",
        },
        {
          valid: true,
          question: "The Battle of Trafalgar took place on October 23rd, 1805",
        },
        {
          valid: false,
          question:
            "Spoon theory is a theory, utilizing 'Spoons' as a metaphor for energy they can use in a day.",
        },
        {
          valid: true,
          question:
            "The T-Mobile Sidekick smartphone is a re-branded version of the Danger Hiptop.",
        },
        {
          valid: false,
          question:
            "The protagonist's names in Who's Afraid of Virginia Woolf, George and Martha, were derived from George Washington and his wife.",
        },
      ],
      quizAnswer: () => {},
      quizReset: () => {},
    };

    const { getByTestId, getAllByTestId } = render(
      <QuizContext.Provider value={initialState}>
        <Results />
      </QuizContext.Provider>
    );

    const score = getByTestId("result-score");

    const trueAnswers = initialState.answers.filter(
      (answer) => answer.valid
    ).length;

    expect(score).toHaveTextContent(
      `You scored ${trueAnswers} / ${initialState.answers.length}`
    );

    const resultQuestions = getAllByTestId("result-block");
    const resultSigns = getAllByTestId("result-mark");

    initialState.answers.forEach((answer, i) => {
      expect(resultQuestions[i]).toHaveTextContent(answer.question);

      if (answer.valid) {
        expect(resultSigns[i]).toHaveTextContent("+");
      } else {
        expect(resultSigns[i]).toHaveTextContent("-");
      }
    });
  });

  it("should not render the component when the result answers are empty", () => {
    const initialState: QuizState = {
      answers: [],
      quizAnswer: () => {},
      quizReset: () => {},
    };
    const { getByTestId, queryByTestId } = render(
      <QuizContext.Provider value={initialState}>
        <Results />
      </QuizContext.Provider>
    );
    const score = getByTestId("result-score");

    expect(score).toHaveTextContent(
      `You scored ${0} / ${initialState.answers.length}`
    );

    expect(queryByTestId("result-block")).toBeNull();
  });
});
