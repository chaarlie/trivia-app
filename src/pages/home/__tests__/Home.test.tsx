import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { MemoryRouter, Route } from "react-router-dom";

import App from "../../../App";
import Home from "../Home";

describe("Home", () => {
  it("should render properly the component", () => {
    const { getByText } = render(<Home />);
    getByText(/Welcome to the Trivia Challange!/i);
  });

  it("should trigger next route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
        <Route path="*" />
      </MemoryRouter>
    );

    const button = screen.getByText(/begin/);
    expect(button).toBeInTheDocument();

    act(() => {
      fireEvent.click(button);
    });

    screen.getByText(/loading/gi);
  });
});
