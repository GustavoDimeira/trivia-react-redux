import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Feedback from "../pages/Feedback";
import App from "../App";
describe('Página de Feedback', () => {

    const INITIAL_STATE0 = {
    player: {
      name: 'lemmy',
      assertions: 0,
      score: 0,
      gravatarEmail: 'https://www.gravatar.com/avatar/b623807fb0dd65f8db3bad61ab864845'
    }
  };

  const INITIAL_STATE3 = {
    player: {
      name: 'silver',
      assertions: 3,
      score: 148,
      gravatarEmail: 'https://www.gravatar.com/avatar/b623807fb0dd65f8db3bad61ab864845'
    }
  };

it('reenderisação na tela', () => {
renderWithRouterAndRedux(<App />, INITIAL_STATE0, '/feedback');

  const score = screen.getByTestId('feedback-total-score');
  expect(score).toHaveTextContent(INITIAL_STATE0.player.score);
  expect(score).toBeDefined();

  const message = screen.getByTestId('feedback-text');
  expect(message).toHaveTextContent('Could be better...');
  expect(message).toBeDefined();

  const assertions = screen.getByTestId('feedback-total-question');
  expect(assertions).toHaveTextContent(INITIAL_STATE0.player.assertions);
  expect(assertions).toBeDefined();

});
it('reenderisação na tela', () => {
renderWithRouterAndRedux(<App />, INITIAL_STATE3, '/feedback');

  const score = screen.getByTestId('feedback-total-score');
  expect(score).toHaveTextContent(INITIAL_STATE3.player.score);
  expect(score).toBeDefined();

  const message = screen.getByTestId('feedback-text');
  expect(message).toHaveTextContent('Well Done!');
  expect(message).toBeDefined();

  const assertions = screen.getByTestId('feedback-total-question');
  expect(assertions).toHaveTextContent(INITIAL_STATE3.player.assertions);
  expect(assertions).toBeDefined();

});
it('botão Play Again', () => {
  const {history} = renderWithRouterAndRedux(<App />);
  history.push('/feedback')

  const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(btnPlayAgain).toBeDefined();
    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/');

});

it('botão Play Again', () => {
renderWithRouterAndRedux(<App />, INITIAL_STATE3, '/feedback');

  const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(btnPlayAgain).toBeDefined();
    userEvent.click(btnPlayAgain);

});

it('botão Play ranking', () => {
  const {history} = renderWithRouterAndRedux(<App />);
  history.push('/feedback')

    const btnRanking = screen.getByRole('button', {  name: /Ranking/i});
    expect(btnRanking).toBeDefined();
    userEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking');
  
  });

  it('botão Play ranking', () => {
renderWithRouterAndRedux(<App />, INITIAL_STATE3, '/feedback');

    const btnRanking = screen.getByRole('button', {  name: /Ranking/i});
    expect(btnRanking).toBeDefined();
    userEvent.click(btnRanking);
  
  });

});