import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetAssertionsAction, resetScoreAction } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    this.handleLocalStorage();
  }

  handleLocalStorage = () => {
    const { gravatarHash, name, score } = this.props;
    if (!localStorage.getItem('ranking')) {
      const arrCurrentRanking = [
        { name, score, picture: `https://www.gravatar.com/avatar/${gravatarHash}` },
      ];
      localStorage.setItem('ranking', JSON.stringify(arrCurrentRanking));
    } else {
      const lastRanking = JSON.parse(localStorage.getItem(('ranking')));
      const objCurrentRanking = { name, score, picture: `https://www.gravatar.com/avatar/${gravatarHash}` };
      const newRanking = [...lastRanking, objCurrentRanking];
      newRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  };

  handlePlayAgainButton = () => {
    const { history, resetScore, resetAssertions } = this.props;
    resetScore();
    resetAssertions();
    history.push('/');
  };

  handleRankingButton = () => {
    const { history, resetScore, resetAssertions } = this.props;
    resetScore();
    resetAssertions();
    history.push('/ranking');
  };

  render() {
    const three = 3;
    const { points, score } = this.props;
    if (points < three) {
      return (
        <>
          <Header />
          <div data-testid="feedback-total-score">
            { score }
          </div>
          <div data-testid="feedback-text">
            Could be better...
            <br />
            <div data-testid="feedback-total-question">
              { points }
            </div>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ () => this.handlePlayAgainButton() }
            >
              Play Again
            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ () => this.handleRankingButton() }
            >
              Ranking
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <Header />
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-text">
          Well Done!
          <br />
          <div data-testid="feedback-total-question">
            { points }
          </div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => this.handlePlayAgainButton() }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => this.handleRankingButton() }
          >
            Ranking
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  points: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  gravatarHash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resetScore: PropTypes.func.isRequired,
  resetAssertions: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  points: store.player.assertions,
  score: store.player.score,
  gravatarHash: store.login.gravatarHash,
  name: store.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: (score) => { dispatch(resetScoreAction(score)); },
  resetAssertions: (assertion) => { dispatch(resetAssertionsAction(assertion)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
