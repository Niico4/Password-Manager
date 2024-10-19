export const generateCustomPassword = (
  value: number,
  isMayus: boolean,
  isMinus: boolean,
  isNumbers: boolean,
  isSpecialCharacters: boolean
) => {
  const mayusCharset = 'ABCDEFGHIJKLMNOPQRSTUVEXYZ',
    minusCharset = 'abcdefghijklmnopqrstuvwxyz',
    numbersCharset = '0123456789',
    specialCharset = '!@#$%^&*()_+~`|}{[]:';

  let charset = '';

  if (isMayus) charset += mayusCharset;
  if (isMinus) charset += minusCharset;
  if (isNumbers) charset += numbersCharset;
  if (isSpecialCharacters) charset += specialCharset;

  let password = '';

  if (isMayus)
    password += mayusCharset.charAt(
      Math.floor(Math.random() * mayusCharset.length)
    );
  if (isMinus)
    password += minusCharset.charAt(
      Math.floor(Math.random() * minusCharset.length)
    );
  if (isNumbers)
    password += numbersCharset.charAt(
      Math.floor(Math.random() * numbersCharset.length)
    );
  if (isSpecialCharacters)
    password += specialCharset.charAt(
      Math.floor(Math.random() * specialCharset.length)
    );

  for (let i = password.length; i < value; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
};
