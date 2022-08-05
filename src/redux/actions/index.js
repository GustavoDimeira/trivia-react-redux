export const USER_LOGIN = 'USER_LOGIN';

export const minhaAction = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});
