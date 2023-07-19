// core modules

// local modules
const wholesaleController = require("../controllers/wholesaler");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// get path to all products available to wholesalers
router.get("/available-products", wholesaleController.getAvailableProducts);

// get path to wholesaler all products
router.get("/all-products", wholesaleController.getAllProducts);

// get path to wholesaler purchased products
router.get("/purchased-products", wholesaleController.getPurchasedProducts);

// get path to wholesaler sold products
router.get("/sold-products", wholesaleController.getSoldProducts);

module.exports = router;
