// local modules
const { isObjectIdOrHexString } = require("mongoose");
const Product = require("../models/product"); //importing Product model
const User = require("../models/user"); //importing User model

const crypto = require("crypto");

let userId;
// post add product( To post farmer's new product)
exports.postAddProduct = (req, res, next) => {
  // const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      // console.log(user._id.toString());
      let farmerId = user._id;
      Product.create({
        batchNum: req.body.batchNum,
        variety: req.body.variety,
        weight: req.body.weight,
        price: req.body.price,
        harvestDate: req.body.harvestDate,
        fertilizer: {
          typeOfFertilizer: req.body.fertilizer,
          npkRatio: {
            n: req.body.n,
            p: req.body.p,
            k: req.body.k,
          },
        },
        // farmer: { User: farmerId },
        "farmer.farmer_name": user.orgName,
        farmer: {
          User: farmerId,
          location: {
            country: user.country,
            region: user.region,
          },
        },
        wholesaler: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
        distributor: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
        retailer: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
      })
        .then((product) => {
          console.log(product);
          res.redirect(`all-products/${userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get farmer all products( To display all produce of farmers)
exports.getFarmerAllProduts = (req, res, next) => {
  userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const farmer = user._id;
      console.log(farmer);
      Product.find({ "farmer.User": farmer })
        .then((products) => {
          console.log(products);
          res.render(`farmer/all-products`, {
            path: "/farmer/all-products",
            role: "farmer",
            title: "All Products",
            prods: products,
            user: user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// post delete product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId.toString();
  console.log(prodId);
  Product.deleteOne({ _id: prodId })
    .then((product) => {
      console.log(product);
      res.redirect(`all-products/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get farmer's sold products( To display produce sold by farmer)
exports.getFarmerSoldProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const farmerId = user._id;
      Product.find({
        "farmer.User": farmerId,
        "wholesaler.orderConfirmed": true,
      })
        .then((products) => {
          console.log(products);
          res.render("farmer/sold-products", {
            path: "/farmer/sold-products",
            role: "farmer",
            title: "Sold Products",
            prods: products,
            user: user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get farmer's available products( To display farmer's avilable produce)
exports.getFarmerAvailableProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const farmer = user._id;
      Product.find({
        "farmer.User": farmer,
        "wholesaler.orderConfirmed": false,
      })
        .then((products) => {
          // console.log(products);
          res.render("farmer/available-products", {
            path: "/farmer/available-products",
            role: "farmer",
            title: "Available Products",
            prods: products,
            user: user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get farmer's purchase requests (To display produtcs wholesalers have ordered from farmer)
exports.getPurchaseRequests = (req, res, next) => {
  userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      Product.find({
        "farmer.User": userId,
        "wholesaler.ordered": true,
        "wholesaler.orderConfirmed": false,
      })
        .then((products) => {
          // console.log(products);
          res.render("farmer/purchase-requests", {
            path: "/farmer/purchase-requests",
            role: "farmer",
            title: "Purchase Requests",
            user: user,
            prods: products,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// post confirm order(to confirm wholesalers' order)
exports.postConfirmOrder = (req, res, next) => {
  const prodId = req.body.batchNum;
  console.log(prodId);

  Product.updateOne(
    { batchNum: prodId },
    {
      $set: {
        "wholesaler.orderConfirmed": true,
      },
    }
  )
    .then((product) => {
      console.log(product);
      res.redirect(`/farmer/purchase-requests/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// post decline order
exports.postDeclineOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  Product.updateOne(
    { batchNum: batchNum },
    {
      $set: {
        wholesaler: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
      },
    }
  ).then((product) => {
    console.log(product);
    res.redirect(`/farmer/purchase-requests/${userId}`);
  });
};
