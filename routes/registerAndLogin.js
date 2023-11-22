//local modules
const registerAndLoginController = require("../controllers/registerAndLogin"); //importing registerAndLogin controller

//third-party modules
const express = require("express");

const router = express.Router();

// path to registration page
router.get("/registration", registerAndLoginController.getRegistration);
// path to post registration
router.post("/registration", registerAndLoginController.postRegistration);
// path to login page
router.get("/login", registerAndLoginController.getLogin);
// path to post login
router.post("/login", registerAndLoginController.postLogin);
// path to logout
router.get("/logout", registerAndLoginController.getLogout);

// exporting router
module.exports = router;
