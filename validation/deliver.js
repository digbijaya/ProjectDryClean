const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDeliverInput(data) {
  let errors = {};

  data.user.mobilenumber = isEmpty(data.user.mobilenumber)
    ? ""
    : data.user.mobilenumber;

  if (!validator.isLength(data.user.mobilenumber, { min: 3, max: 10 })) {
    errors.mobilenumber = "Mobile number need to be atleast 3 digits";
  }
  if (validator.isEmpty(data.user.mobilenumber)) {
    errors.mobilenumber = "Mobile number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
