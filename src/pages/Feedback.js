import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const three = 3;
    const { points, score, history } = this.props;
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
            onClick={ () => history.push('/') }
          >
            Play Again
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
};

const mapStateToProps = (state) => ({
  points: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
