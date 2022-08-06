import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, gravatar } = this.props;
    return (
      <div className="header">
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatar}` } alt="gravatar" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.login.name,
  gravatar: store.login.gravatarImage,
});

export default connect(mapStateToProps)(Header);
