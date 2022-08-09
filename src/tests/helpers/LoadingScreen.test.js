import React from "react";
import { screen } from "@testing-library/react";
import App from "../../App";
import {mapDispatchToProps} from '../../pages/Login'
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";


describe('Pagina de login', () => {
  it('Botão Play', async () => {
    const { history} = renderWithRouterAndRedux(<App />);

    const campName = screen.getByPlaceholderText('Nome');
    const campEmail = screen.getByPlaceholderText('Email');
    const btnPlay = screen.getByRole('button', {  name: /play/i});

    expect(campEmail).toBeDefined();
    expect(campName).toBeDefined();
    expect(btnPlay).toBeDefined();

    expect(btnPlay.disabled).toBe(true);

    userEvent.type(campName, 'nome');
    expect(campName).toHaveValue('nome')

    userEvent.type(campEmail, 'alguem@alguem.com');
    expect(campEmail).toHaveValue('alguem@alguem.com')

    expect(btnPlay.disabled).toBe(false);

    userEvent.click(btnPlay);
    await screen.findByText(/categoria/i)

    expect(history.location.pathname).toBe('/game');

  });
  it('Botão de Configurações', () => {
    const { history} = renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', {  name: /configurações/i});
    expect(btnConfig).toBeDefined();
    userEvent.click(btnConfig);

    expect(history.location.pathname).toBe('/settings');

  });
});
