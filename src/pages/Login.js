import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
      isPlayButtonDisabled: true,
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

  render() {
    const { isPlayButtonDisabled, nameInput, emailInput } = this.state;
    return (
      <div>
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
