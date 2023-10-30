// core modules
const path = require("path");

// local modules
const farmerController = require("../controllers/farmer");

// thirdparty modules
const express = require("express"); //importing express

// use the Router function on express and assign to router
const router = express.Router();

// post path to add product
router.post("/add-product", farmerController.postAddProduct);
router.post("/delete-product", farmerController.postDeleteProduct);
// post path to confirm order
router.post("/confirm-order", farmerController.postConfirmOrder);
//post path to decline order
router.post("/decline-order", farmerController.postDeclineOrder);
// get path to all farmer's products
router.get("/all-products/:userId", farmerController.getFarmerAllProduts);
// get path to farmer's sold products
router.get("/sold-products/:userId", farmerController.getFarmerSoldProducts);
// get path to farmer's available products
router.get(
  "/available-products/:userId",
  farmerController.getFarmerAvailableProducts
);
//get path to farmer's purchase requests
router.get("/purchase-requests/:userId", farmerController.getPurchaseRequests);

// export router
module.exports = router;
