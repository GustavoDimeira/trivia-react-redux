export const USER_LOGIN = 'USER_LOGIN';
export const POINT = 'POINT';

export const loginAction = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const gravatarAction = (gravatarHash) => ({
  type: 'GRAVATAR_IMAGE',
  gravatarHash,
});

export const correctAnswerAction = () => ({
  type: POINT,
});

export const scoreAction = (score) => ({
  type: 'SCORE',
  score,
});

export const resetScoreAction = () => ({
  type: 'RESET_SCORE',
});

export const resetAssertionsAction = () => ({
  type: 'RESET_ASSERTIONS',
});
