import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const three = 3;
    const { points } = this.props;
    if (points < three) {
      return (
        <>
          <Header />
          <div data-testid="feedback-text">
            Could be better...
            <br />
            { `Quantia de acertos: ${points}` }
          </div>
        </>
      );
    }
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          Well Done!
          <br />
          { `Quantia de acertos: ${points}` }
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  points: state.feedback.points,
});

export default connect(mapStateToProps, null)(Feedback);
