// core modules
const path = require("path");

// local modules
const farmerController = require("../controllers/farmer");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// get path to all farmer's products
router.get("/all-products", farmerController.getFarmerAllProduts);
// get path to farmer's sold products
router.get("/sold-products", farmerController.getFarmerSoldProducts);
// get path to farmer's available products
router.get("/available-products", farmerController.getFarmerAvailableProducts);

// export router
module.exports = router;
