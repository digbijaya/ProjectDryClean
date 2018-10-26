const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAuthInput(data) {
  let errors = {};
  data.username = isEmpty(data.username) ? "" : data.username;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (isEmpty(data.username)) {
    errors.username = "Username is required";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
