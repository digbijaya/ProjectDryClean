const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReceivedOrder(data) {
  let errors = {};

  data.user.username = isEmpty(data.user.username) ? "" : data.user.username;
  data.user.mobilenumber = isEmpty(data.user.mobilenumber)
    ? ""
    : data.user.mobilenumber;
  data.clothname = isEmpty(data.clothname) ? "" : data.clothname;
  data.description = isEmpty(data.description) ? "" : data.description;

  data.order = isEmpty(data.order) ? "" : data.order;

  if (!validator.isLength(data.user.username, { min: 3, max: 50 })) {
    errors.username =
      "User name should be between 3 and 50 characters. Boundaries inclusive";
  }
  if (validator.isEmpty(data.user.username)) {
    errors.username = "Name feild is required";
  }
  if (!validator.isLength(data.user.mobilenumber, { min: 3, max: 10 })) {
    errors.mobilenumber = "Mobile number need to be atleast 3 digits";
  }
  if (validator.isEmpty(data.user.mobilenumber)) {
    errors.mobilenumber = "Mobile number is required";
  }
  // if (validator.isEmpty(data.clothname)) {
  //   errors.clothname = "Cloth name feild is required";
  // }
  // if (validator.isEmpty(data.description)) {
  //   errors.description = "Cloth description feild is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
