// core modules

// local modules
const retailerController = require("../controllers/retailer");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// path to retailer all products
router.get("/all-products", retailerController.getAllProducts);

// path to retailer purchased product
router.get("/purchased-products", retailerController.getPurchasedProducts);

// export router
module.exports = router;
