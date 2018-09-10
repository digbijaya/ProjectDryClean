const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReceivedOrder(data) {
  let errors = {};

  data.user.username = isEmpty(data.user.username) ? "" : data.user.username;
  data.user.mobilenumber = isEmpty(data.user.mobilenumber)
    ? ""
    : data.user.mobilenumber;
  data.order = isEmpty(data.order) ? "" : data.order;
  console.log("****************************** " + data.order);
  /* data.order.forEach(order => {
    order.clothtype = isEmpty(order.clothtype) ? "" : order.clothtype;
    order.quality = isEmpty(order.quality) ? "" : order.quality;
    order.washtype = isEmpty(order.washtype) ? "" : order.washtype;
    order.color = isEmpty(order.color) ? "" : order.color;
    order.quantity = isEmpty(order.quantity) ? "" : order.quantity;
    order.price = isEmpty(order.price) ? "" : order.price;
  }); */
  data.orderstatus = isEmpty(data.orderstatus) ? "" : data.orderstatus;
  data.totalprice = isEmpty(data.totalprice) ? "" : data.totalprice;
  data.orderplaceddate = isEmpty(data.orderplaceddate)
    ? ""
    : data.orderplaceddate;

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
  if (isEmpty(data.order)) {
    errors.order = "Atleast one order is required";
  }
  if (validator.isEmpty(data.orderstatus)) {
    errors.orderstatus = "Order status is required";
  }
  if (validator.isInt("" + data.totalprice, [{ min: 1 }])) {
    errors.totalprice = "total price can't be 0";
  }
  if (validator.isEmpty(data.orderplaceddate)) {
    errors.orderplaceddate = "Order placed date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
