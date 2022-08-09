export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};

export const fetchQuestions = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    // console.log('log:', data.results);
    return data.results;
  } catch (error) {
    console.log(`algo deu errado: ( /n${error})`);
  }
};
