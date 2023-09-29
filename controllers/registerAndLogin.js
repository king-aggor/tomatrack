// local modules
const User = require("../models/user"); //importing User class from user model

// get registration page
exports.getRegistration = (req, res, next) => {
  res.render("registerAndLogin/register");
};

// post registration
exports.postRegistration = (req, res, next) => {
  // create and store new user
  User.create({
    orgName: req.body.name,
    roles: { User: req.body.role },
    email: req.body.email,
    country: req.body.country,
    region: req.body.region,
    password: req.body.password,
  })
    .then((user) => {
      console.log(user);
      const userId = user._id.toString();
      const role = user.roles.User.toLowerCase();
      res.redirect(`${role}/all-products/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get login page
exports.getLogin = (req, res, nex) => {
  res.render("registerAndLogin/login");
};

exports.postLogin = (req, res, next) => {
  //find a user whose email & password matches user login input
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      const userId = user._id.toString();
      const role = user.roles.User.toLowerCase();
      res.redirect(`${role}/all-products/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
