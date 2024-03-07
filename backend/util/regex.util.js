export const testEmail = (email) => {
  const regex = /([\d\w._-]+@[\d\w._-]+\.[\d\w_-]+)/gi;
  return regex.test(email);
};

export const testName = (name) => {
  const regex = /^[a-zA-Z ]{1,25}$/gi;
  return regex.test(name);
};

export const testPassword = (password) => {
  const regex = /^.{8,25}$/gi;
  return regex.test(password);
};

export const testMessage = (password) => {
  const regex = /^[a-zA-Z0-9 .,!?]{1,25}$/gi;
  return regex.test(password);
};

export const testPhone = (phone) => {
  const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/gi;
  return regex.test(phone);
};

export const testUrl = (url) => {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  return regex.test(url);
};

export const testTags = (tags) => {
  const regex = /^[a-zA-Z0-9 -_.,]{1,100}$/gi;
  return regex.test(tags);
};
