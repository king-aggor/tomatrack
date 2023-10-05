// local modules
const productController = require("../controllers/product"); //importing product controller
// third-party modules
const express = require("express"); //importing express

const router = express.Router();

// path to product-details page
router.get("/product/:prodId", productController.getProduct);

// exporting router
module.exports = router;
