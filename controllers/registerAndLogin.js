// local modules
const User = require("../models/user"); //importing User class from user model

// get registration page
exports.getRegistration = (req, res, next) => {
  res.render("registerAndLogin/register");
};

// post registration
exports.postRegistration = (req, res, next) => {
  // create an instace of User class
  const user = new User(
    null,
    req.body.role,
    req.body.name,
    req.body.email,
    req.body.country,
    req.body.region,
    req.body.password
  );
  // save user to user array
  user.save();

  console.log(user);
  let role = user.role;

  if (role == "Farmer") {
    res.redirect("farmer/all-products");
  } else if (role == "Wholesaler") {
    res.redirect("wholesaler/all-products");
  } else if (role == "Distributor") {
    res.redirect("distributor/all-products");
  } else {
    res.redirect("wholesaler/all-products");
  }
};

// get login page
exports.getLogin = (req, res, nex) => {
  res.render("registerAndLogin/login");
};
