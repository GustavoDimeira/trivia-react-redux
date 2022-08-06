export const USER_LOGIN = 'USER_LOGIN';

export const loginAction = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const gravatarAction = (gravatarHash) => ({
  type: 'GRAVATAR_IMAGE',
  gravatarHash,
});
