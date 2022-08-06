import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { fetchToken } from '../services/FetchAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
      isPlayButtonDisabled: true,
      isLooged: false,
    };
  }

  validateButton = () => {
    const { nameInput, emailInput } = this.state;
    if (nameInput !== '' && emailInput !== '') {
      this.setState({
        isPlayButtonDisabled: false,
      });
    } else {
      this.setState({
        isPlayButtonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.validateButton);
  };

  handleClick = async () => {
    localStorage.setItem('token', await fetchToken());
    this.setState({
      isLooged: true,
    });
  }

  render() {
    const { isPlayButtonDisabled, nameInput, emailInput, isLooged } = this.state;
    return (
      <div>
        { isLooged && <Redirect to="/game" /> }
        <label htmlFor="nameInput">
          <input
            type="text"
            placeholder="Nome"
            id="nameInput"
            name="nameInput"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ nameInput }
          />
        </label>
        <label htmlFor="emailInput">
          <input
            type="email"
            placeholder="Email"
            id="emailInput"
            name="emailInput"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ emailInput }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isPlayButtonDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <Link to="/settings" data-testid="btn-settings">
          <button
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
