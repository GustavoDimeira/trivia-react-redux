import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import { gravatarAction, loginAction } from '../redux/actions';
import { fetchToken } from '../services/FetchAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
      isPlayButtonDisabled: true,
      isLogged: false,
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

  handlePlayButton = async () => {
    localStorage.setItem('token', await fetchToken());
    this.setState({
      isLogged: true,
    });
    const { emailInput, nameInput } = this.state;
    const { login, gravatarImage } = this.props;
    login(nameInput, emailInput);
    const hashEmail = md5(emailInput).toString();
    gravatarImage(hashEmail);
  };

  handleConfigButton = async () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isPlayButtonDisabled, nameInput, emailInput, isLogged } = this.state;
    return (
      <div>
        { isLogged && <Redirect to="/game" /> }
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
          onClick={ this.handlePlayButton }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigButton }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  gravatarImage: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (nameUser, emailUser) => dispatch(loginAction(nameUser, emailUser)),
  gravatarImage: (hash) => dispatch(gravatarAction(hash)),
});

export default connect(null, mapDispatchToProps)(Login);
