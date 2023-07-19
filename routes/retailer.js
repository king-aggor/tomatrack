// core modules

// local modules
const retailerController = require("../controllers/retailer");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

router.get("/all-products", retailerController.getRetailerAllProducts);

// export router
module.exports = router;
