import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchQuestions } from '../services/FetchAPI';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      errorApi: false,
      questionType: [],
      questionsCategory: [],
      questionCorrectAnswers: [],
      questionAnswers: [],
      questionQuestions: [],
      indexQuestion: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { indexQuestion } = this.state;
    const token = localStorage.getItem('token');
    const tokenApi = await fetchQuestions(token);
    const questionsLength = 5;
    if (tokenApi.length !== questionsLength) {
      this.setState({ errorApi: true });
      localStorage.clear();
    }
    const arrayOfTypes = tokenApi.map((element) => element.type);
    const arrayOfCategories = tokenApi.map((element) => element.category);
    const arrayOfQuestions = tokenApi.map((element) => element.question);
    const arrayOfCorrectAnswer = tokenApi.map((element) => element.correct_answer);
    const arrayOfIncorrectAnswer = tokenApi.map((element) => element.incorrect_answers);
    // console.log('arrayOfCorrectAnswer', arrayOfCorrectAnswer);
    // console.log('arrayOfIncorrectAnswer', arrayOfIncorrectAnswer);
    // console.log('arrayOfAll', [...arrayOfIncorrectAnswer[indexQuestion],
    // arrayOfCorrectAnswer[indexQuestion]]);

    this.setState({
      questionType: arrayOfTypes,
      questionsCategory: arrayOfCategories,
      questionQuestions: arrayOfQuestions,
      questionCorrectAnswers: arrayOfCorrectAnswer,
      questionAnswers: ([...arrayOfIncorrectAnswer,
        arrayOfCorrectAnswer]),
    });
    console.log('teste', tokenApi.map((element) => element));
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  handleAnswer = (question) => {
    const { indexQuestion, questionCorrectAnswers, questionAnswers } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1 });
    console.log(question);

    this.setState({
    });
  };

  render() {
    const { errorApi, questionType, questionsCategory,
      questionQuestions, indexQuestion, questionAnswers,
      questionCorrectAnswers } = this.state;
    return (
      <>
        <Header />
        <span
          data-testid="question-category"
        >
          { `Categoria: ${questionsCategory[indexQuestion]}` }
        </span>
        <span data-testid="question-text">{ questionQuestions[indexQuestion] }</span>
        {/* {
          questionType[indexQuestion] === 'multiple'
            ? (
              <div>

              </div>
            )
            : (
              <div>

              </div>
            )
        } */}
        {
          questionAnswers.map((question, index) => (
            <button
              key={ question }
              type="button"
              onClick={ () => this.handleAnswer(question) }
              data-testid={ question === questionCorrectAnswers[indexQuestion]
                ? 'correct-answer' : `wrong-answer-${index}` }
            >
              { question }
            </button>))
        }
        { errorApi && <Redirect to="/" /> }
      </>
    );
  }
}

export default Game;
