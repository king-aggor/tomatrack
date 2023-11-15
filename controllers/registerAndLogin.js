// local modules
const User = require("../models/user"); //importing User class from user model

// third party modules
const bcrypt = require("bcrypt"); //importing bcrypt

// get registration page
exports.getRegistration = (req, res, next) => {
  res.render("registerAndLogin/register");
};

// post registration
exports.postRegistration = (req, res, next) => {
  // create and store new user
  const password = req.body.password;
  bcrypt
    .hash(password, 13)
    .then((passwordHash) => {
      console.log(hash);
      User.create({
        orgName: req.body.name,
        roles: { User: req.body.role },
        email: req.body.email,
        country: req.body.country,
        region: req.body.region,
        password: passwordHash,
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
  //   User.findOne({ email: req.body.email, password: req.body.password })
  //     .then((user) => {
  //       const userId = user._id.toString();
  //       const role = user.roles.User.toLowerCase();
  //       res.redirect(`${role}/all-products/${userId}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // find a user whoses email matches user email input
  User.findOne({ email: req.body.email })
    .then((user) => {
      // console.log user does not exist if email doesnt match any user in DB
      if (!user) {
        console.log("User does note exist");
      }
      //if user exists compare user password input with hashed password in DB
      else if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((password) => {
            // console.log email and password do not match if password input  does not match user hashed password
            if (user && !password) {
              console.log("Email and Password do not match");
            }
            // if user exist and user input password matches hashed password, redirect to the stakeholder's all-products page
            if (user && password) {
              console.log("Loged in");
              const userId = user._id.toString();
              const role = user.roles.User.toLowerCase();
              res.redirect(`${role}/all-products/${userId}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
