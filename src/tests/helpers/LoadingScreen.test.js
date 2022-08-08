import React from "react";
import { screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";


describe('Pagina de login', () => {
  it('Botão Play', () => {
    renderWithRouterAndRedux(<App />);

    const campName = screen.getByPlaceholderText('Nome');
    const campEmail = screen.getByPlaceholderText('Email');
    const btnPlay = screen.getByRole('button', {  name: /play/i});

    expect(btnPlay.disabled).toBe(true);

    userEvent.type(campName, 'nome');
    userEvent.type(campEmail, 'email');

    expect(btnPlay.disabled).toBe(false);

    userEvent.click(btnPlay);
  });
  it('Botão de Configurações', () => {
    renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', {  name: /configurações/i});
    userEvent.click(btnConfig);

    const screenConfig = screen.getByText(/configurações/i);
    expect(screenConfig).toBeInTheDocument();
  });
});
