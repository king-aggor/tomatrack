// core modules

// local modules
const wholesaleController = require("../controllers/wholesaler");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// get path to all products available to wholesalers
router.get("/available-products", wholesaleController.getAvailableProducts);

module.exports = router;
