import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking
          && (
            ranking.map((position, index) => (
              <div key={ index }>
                <img src={ position.picture } alt={ position.name } />
                <span data-testid={ `player-name-${index}` }>
                  { position.name }
                </span>
                <span data-testid={ `player-score-${index}` }>
                  { position.score }
                </span>
              </div>
            ))
          ) }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
