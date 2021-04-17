export const errorsAuth = [
  {
    value: 'SyntaxError: Unexpected token C in JSON at position 0',
    name: 'Почта или пароль(не меньше 8 знаков) неверны',
  },
  {
    value: 'SyntaxError: Unexpected token F in JSON at position 0',
    name: 'Пароль неверный или пользователь не имеет пароля',
  },
  {
    value: 'SyntaxError: Unexpected token u in JSON at position 0',
    name: 'Такой пользователь уже существует',
  },
  {
    value: '"password" length must be at least 8 characters long',
    name: 'Пароль должен быть не меньше 8 знаков',
  },
];
export const getErrors = (value: string): string | null => {
  const error = errorsAuth.find((x) => x.value === value);
  if (error) {
    return error.name;
  }
  return null;
};
