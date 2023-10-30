// core modules

// local modules
const wholesaleController = require("../controllers/wholesaler");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// get path to all products available to wholesalers
router.get(
  "/available-products/:userId",
  wholesaleController.getAvailableProducts
);

// post path to buy product
router.post("/buy-product", wholesaleController.postBuyProduct);

// post path to cancel wholesaler's order
router.post("/cancel-order", wholesaleController.postCancelOrder);

// get path to wholesaler all products
router.get("/all-products/:userId", wholesaleController.getAllProducts);

// get path to wholesaler purchased products
router.get(
  "/purchased-products/:userId",
  wholesaleController.getPurchasedProducts
);

// get path to purchase request
router.get(
  "/purchase-requests/:userId",
  wholesaleController.getPurchaseRequests
);

// get path to wholesaler sold products
router.get("/sold-products/:userId", wholesaleController.getSoldProducts);

module.exports = router;
