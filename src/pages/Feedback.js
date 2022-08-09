import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { points } = this.props;
    if (points < 3) {
      return (
        <div data-testid="feedback-text">
          Could be better...
          <br/>
          { `Quantia de acertos: ${points}` }
        </div>
      );
    } else {
      return (
        <div data-testid="feedback-text">
          Well Done!
          <br/>
          { `Quantia de acertos: ${points}` }
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  points: state.feedback.points,
});

export default connect(mapStateToProps, null)(Feedback);
