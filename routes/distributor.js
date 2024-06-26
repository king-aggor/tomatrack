// local modules
const distributorController = require("../controllers/distributor");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// get path to distributor all products
router.get("/all-products/:userId", distributorController.getAllProducts);

// get path to available products
router.get(
  "/available-products/:userId",
  distributorController.getAvailableProducts
);

// post path to buy product
router.post("/buy-product", distributorController.postBuyProduct);

// posr path to cancel oder
router.post("/cancel-order", distributorController.postCancelOrder);

// get path to purchased products
router.get(
  "/purchased-products/:userId",
  distributorController.getPurchasedProduct
);

// get path to purchase requests
router.get(
  "/purchase-requests/:userId",
  distributorController.getPurchaseRequests
);

// post path to decline requests
router.post("/decline-order", distributorController.postDeclineOrder);

// post path  to confirm order
router.post("/confirm-order", distributorController.postConfirmOrder);

// get path to sold products
router.get("/sold-products/:userId", distributorController.getSoldProducts);

// export router
module.exports = router;
