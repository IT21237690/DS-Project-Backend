export function firstLetterUppercase(str) {
  const valueString = str.toLowerCase();
  return valueString.split(' ').map(value => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`).join(' ');
}
export function lowerCase(str) {
  return str.toLowerCase();
}
export const toUpperCase = str => {
  return str ? str.toUpperCase() : str;
};
export function isEmail(email) {
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
}
export function isDataURL(value) {
  const dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
  return dataUrlRegex.test(value);
}
//# sourceMappingURL=helpers.js.map