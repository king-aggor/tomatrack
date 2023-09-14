//local modules
const registerAndLoginController = require("../controllers/registerAndLogin");

//third-party modules
const express = require("express");

const router = express.Router();

// path to registration page
router.get("/registration", registerAndLoginController.getRegistration);

// exporting router
module.exports = router;
