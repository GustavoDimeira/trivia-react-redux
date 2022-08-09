import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchQuestions } from '../services/FetchAPI';

const correctAnswer = 'correct-answer'; // por conta de repetir muitas vezes a palavra
const tres = 3; // por conta do no magic numbers
const quatro = 4; // por conta do no magic numbers

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      errorApi: false,
      questionsCategory: [],
      questionCorrectAnswers: [],
      questionQuestions: [],
      indexQuestion: 0,
      answersQuestion1: [],
      answersQuestion2: [],
      answersQuestion3: [],
      answersQuestion4: [],
      answersQuestion5: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  shuffleArray = (array) => { // função para embaralhar as respostas
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  getQuestions = async () => {
    // recuperando o token do localStorage
    const token = localStorage.getItem('token');
    // requisição à API
    const tokenApi = await fetchQuestions(token);
    // redirecionamento para a tela de login caso a API falhe (utilizando estado local com renderização condicional)
    const questionsLength = 5;
    if (tokenApi.length !== questionsLength) {
      this.setState({ errorApi: true });
      localStorage.clear();
    }
    // pegando os arrays com as chaves necessarias da api
    const arrayOfCategories = tokenApi.map((element) => element.category);
    const arrayOfQuestions = tokenApi.map((element) => element.question);
    const arrayOfCorrectAnswer = tokenApi.map((element) => element.correct_answer);
    const arrayOfIncorrectAnswer = tokenApi.map((element) => element.incorrect_answers);
    // pegando as respostas das 5 perguntas (de forma repetitiva pois caso contrário bugava)
    const answersQuestion1 = [...arrayOfIncorrectAnswer[0], arrayOfCorrectAnswer[0]];
    const answersQuestion2 = [...arrayOfIncorrectAnswer[1], arrayOfCorrectAnswer[1]];
    const answersQuestion3 = [...arrayOfIncorrectAnswer[2], arrayOfCorrectAnswer[2]];
    const answersQuestion4 = [...arrayOfIncorrectAnswer[3], arrayOfCorrectAnswer[3]];
    const answersQuestion5 = [...arrayOfIncorrectAnswer[4], arrayOfCorrectAnswer[4]];
    // embaralhando as respostas de forma aleatória
    this.shuffleArray(answersQuestion1);
    this.shuffleArray(answersQuestion2);
    this.shuffleArray(answersQuestion3);
    this.shuffleArray(answersQuestion4);
    this.shuffleArray(answersQuestion5);
    // jogando as informações para o estado local
    this.setState({
      questionsCategory: arrayOfCategories,
      questionQuestions: arrayOfQuestions,
      questionCorrectAnswers: arrayOfCorrectAnswer,
      answersQuestion1,
      answersQuestion2,
      answersQuestion3,
      answersQuestion4,
      answersQuestion5,
    });
  };

  handleAnswer = (target) => { // quando é clicado em alguma resposta, o estado local "indexQuestion" aumenta
    const { indexQuestion } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1 });
    console.log(target.className);
  };

  render() {
    const { errorApi, questionsCategory,
      questionQuestions, indexQuestion,
      questionCorrectAnswers, answersQuestion1, answersQuestion2, answersQuestion3,
      answersQuestion4, answersQuestion5 } = this.state;
    return (
      <>
        <Header />
        <span
          data-testid="question-category"
        >
          { `Categoria: ${questionsCategory[indexQuestion]}` }
        </span>
        <p data-testid="question-text">{ questionQuestions[indexQuestion] }</p>
        <div data-testid="answer-options">
          {
            indexQuestion === 0
            && answersQuestion1.map((question, index) => (
              <button
                key={ `${question}1` }
                type="button"
                onClick={ ({ target }) => this.handleAnswer(target) }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))
          }
          {
            indexQuestion === 1
            && answersQuestion2.map((question, index) => (
              <button
                key={ `${question}2` }
                type="button"
                onClick={ () => this.handleAnswer() }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))
          }
          {
            indexQuestion === 2
            && answersQuestion3.map((question, index) => (
              <button
                key={ `${question}3` }
                type="button"
                onClick={ () => this.handleAnswer() }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))
          }
          {
            indexQuestion === tres
            && answersQuestion4.map((question, index) => (
              <button
                key={ `${question}4` }
                type="button"
                onClick={ () => this.handleAnswer() }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))
          }
          {
            indexQuestion === quatro
            && answersQuestion5.map((question, index) => (
              <button
                key={ `${question}5` }
                type="button"
                onClick={ () => this.handleAnswer() }
                data-testid={ question === questionCorrectAnswers[indexQuestion]
                  ? correctAnswer : `wrong-answer-${index}` }
              >
                { question }
              </button>))
          }
        </div>
        { errorApi && <Redirect to="/" /> }
      </>
    );
  }
}

export default Game;
