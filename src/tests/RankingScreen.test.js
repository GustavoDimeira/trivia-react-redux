import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('tela de Ranking', () => {
  it('', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    history.push('/ranking')

    const title = screen.getByRole('heading', { name: /Ranking/i })
    expect(title).toBeDefined();

    const btnPlayAgain = screen.getByRole('button', { name: /Play Again/i })
    expect(btnPlayAgain).toBeDefined();
    userEvent.click(btnPlayAgain)
  });
});