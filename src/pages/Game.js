import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { correctAnswerAction } from '../redux/actions';
import { fetchQuestions } from '../services/FetchAPI';

const correctAnswer = 'correct-answer'; // por conta de repetir muitas vezes a palavra
const tres = 3; // por conta do no magic numbers
const quatro = 4; // por conta do no magic numbers

class Game extends React.Component {
  constructor() {
    super();
    this.state = { errorApi: false,
      questionsCategory: [],
      questionCorrectAnswers: [],
      questionQuestions: [],
      indexQuestion: 0,
      answersQuestion1: [],
      answersQuestion2: [],
      answersQuestion3: [],
      answersQuestion4: [],
      answersQuestion5: [],
      timer: 30,
      questionAnswerd: false };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    this.gameTimer();
  }

  gameTimer = () => {
    const { timer } = this.state;
    const second = 1000;
    if (timer > 0) {
      setTimeout(
        () => this.setState({
          timer: timer - 1,
        }),
        second,
      );
    }
  };

  shuffleArray = (array) => { // função para embaralhar as respostas
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  getQuestions = async () => {
    const token = localStorage.getItem('token');
    const tokenApi = await fetchQuestions(token);
    const questionsLength = 5;
    if (tokenApi.length !== questionsLength) {
      this.setState({ errorApi: true });
      localStorage.clear();
    }
    const arrayOfCategories = tokenApi.map((element) => element.category);
    const arrayOfQuestions = tokenApi.map((element) => element.question);
    const arrayOfCorrectAnswer = tokenApi.map((element) => element.correct_answer);
    const arrayOfIncorrectAnswer = tokenApi.map((element) => element.incorrect_answers);
    const answersQuestion1 = [...arrayOfIncorrectAnswer[0], arrayOfCorrectAnswer[0]];
    const answersQuestion2 = [...arrayOfIncorrectAnswer[1], arrayOfCorrectAnswer[1]];
    const answersQuestion3 = [...arrayOfIncorrectAnswer[2], arrayOfCorrectAnswer[2]];
    const answersQuestion4 = [...arrayOfIncorrectAnswer[3], arrayOfCorrectAnswer[3]];
    const answersQuestion5 = [...arrayOfIncorrectAnswer[4], arrayOfCorrectAnswer[4]];
    this.shuffleArray(answersQuestion1);
    this.shuffleArray(answersQuestion2);
    this.shuffleArray(answersQuestion3);
    this.shuffleArray(answersQuestion4);
    this.shuffleArray(answersQuestion5);
    this.setState({ questionsCategory: arrayOfCategories,
      questionQuestions: arrayOfQuestions,
      questionCorrectAnswers: arrayOfCorrectAnswer,
      answersQuestion1,
      answersQuestion2,
      answersQuestion3,
      answersQuestion4,
      answersQuestion5 });
  };

  handleAnswer = (target) => { // quando é clicado em alguma resposta, o estado local "indexQuestion" aumenta
    this.setState({ questionAnswerd: true });
    const { correctAnswerAct } = this.props;
    if (target.className === 'correctAnswerWait') {
      correctAnswerAct();
    }
    const correta = document.getElementsByClassName('correctAnswerWait');
    const arr = Array.prototype.slice.call(correta);
    arr[0].classList.add('correctAnswer');
    const erradas = document.getElementsByClassName('wrongAnswerWait');
    const perdeu = Array.prototype.slice.call(erradas);
    perdeu.map((element) => element.classList.add('wrongAnswer'));
  };

  nextQuestion = () => {
    this.setState({ questionAnswerd: false });
    const { indexQuestion } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1 });
  };

  lastQuestion = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { errorApi, questionsCategory, questionQuestions, indexQuestion,
      questionCorrectAnswers,
      answersQuestion1, answersQuestion2, answersQuestion3,
      answersQuestion4, answersQuestion5, questionAnswerd, timer } = this.state;
    return (
      <>
        <Header />
        <h2>
          Tempo:
          {timer }
        </h2>
        <span
          data-testid="question-category"
        >
          { `Categoria: ${questionsCategory[indexQuestion]}` }
        </span>
        <p data-testid="question-text">{ questionQuestions[indexQuestion] }</p>
        <div data-testid="answer-options">
          {indexQuestion === 0
            && answersQuestion1.map((question, index) => (
              <button
                disabled={ timer <= 0 }
                key={ `${question}1` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                className={ question === questionCorrectAnswers[indexQuestion]
                  ? 'correctAnswerWait' : 'wrongAnswerWait' }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))}
          {indexQuestion === 1
            && answersQuestion2.map((question, index) => (
              <button
                disabled={ timer <= 0 }
                key={ `${question}2` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                className={ question === questionCorrectAnswers[indexQuestion]
                  ? 'correctAnswerWait' : 'wrongAnswerWait' }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))}
          {indexQuestion === 2
            && answersQuestion3.map((question, index) => (
              <button
                disabled={ timer <= 0 }
                key={ `${question}3` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                className={ question === questionCorrectAnswers[indexQuestion]
                  ? 'correctAnswerWait' : 'wrongAnswerWait' }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))}
          {indexQuestion === tres
            && answersQuestion4.map((question, index) => (
              <button
                disabled={ timer <= 0 }
                key={ `${question}4` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                className={ question === questionCorrectAnswers[indexQuestion]
                  ? 'correctAnswerWait' : 'wrongAnswerWait' }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))}
          {indexQuestion === quatro
            && answersQuestion5.map((question, index) => (
              <button
                disabled={ timer <= 0 }
                key={ `${question}5` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                className={ question === questionCorrectAnswers[indexQuestion]
                  ? 'correctAnswerWait' : 'wrongAnswerWait' }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))}
          <br />
          <br />
          {questionAnswerd && indexQuestion !== quatro
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.nextQuestion() }
              >
                Next
              </button>
            )}
          {questionAnswerd && indexQuestion === quatro
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.lastQuestion() }
              >
                Next
              </button>
            )}
        </div>
        { errorApi && <Redirect to="/" /> }
      </>
    );
  }
}

Game.propTypes = {
  correctAnswerAct: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  correctAnswerAct: () => { dispatch(correctAnswerAction()); },
});
export default connect(null, mapDispatchToProps)(Game);
