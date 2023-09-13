//core modules
const path = require("path");
//local modules

//third-party modules
const express = require("express");

const router = express.Router();

// route to indes page
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

module.exports = router;
