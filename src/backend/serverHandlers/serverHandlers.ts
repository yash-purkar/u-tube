const isEmailValid = (email: string) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email.match(emailFormat)) return true;
  return false;
};

module.exports = isEmailValid;