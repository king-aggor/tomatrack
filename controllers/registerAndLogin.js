// get registration page
exports.getRegistration = (req, res, next) => {
  res.render("registerAndLogin/register");
};

// get login page
exports.getLogin = (req, res, nex) => {
  res.render("registerAndLogin/login");
};
