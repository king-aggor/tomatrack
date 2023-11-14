// local modules
const User = require("../models/user"); //importing User model
const Product = require("../models/product");

// core modules
const crypto = require("crypto");

let distributorID;
// get all distributor's products
exports.getAllProducts = (req, res, next) => {
  distributorID = req.params.userId;
  User.findById(distributorID)
    .then((user) => {
      const userID = user._id;
      Product.find({
        "distributor.User": userID,
        "distributor.orderConfirmed": true,
      })
        .then((products) => {
          res.render("distributor/all-products", {
            path: "/distributor/all-products",
            role: "distributor",
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

// get wholesaler products available for purchase
exports.getAvailableProducts = (req, res, next) => {
  distributorID = req.params.userId;
  User.findById(distributorID)
    .then((user) => {
      Product.find({
        "wholesaler.orderConfirmed": true,
        "distributor.orderConfirmed": false,
      })
        .then((products) => {
          res.render("distributor/available-products", {
            path: "/distributor/available-products",
            role: "distributor",
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

// post buy product
exports.postBuyProduct = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = distributorID;
  User.findById(userId)
    .then((user) => {
      Product.findOne({ batchNum: batchNum })
        .then((product) => {
          Product.updateOne(
            { batchNum: batchNum },
            {
              $set: {
                distributor: {
                  User: userId,
                  ordered: true,
                  distributor_name: user.orgName,
                  location: {
                    country: user.country,
                    region: user.region,
                  },
                  price: ((product.price * 20) / 100 + product.price).toFixed(
                    2
                  ),
                  ordered: true,
                  orderConfirmed: false,
                },
              },
            }
          )
            .then((product) => {
              res.redirect(`available-products/${userId}`);
            })
            .catch((err) => {
              console.log(err);
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

// post cancel order
exports.postCancelOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = req.body.userId;

  Product.updateOne(
    { "distributor.User": userId, batchNum: batchNum },
    {
      $set: {
        distributor: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
      },
    }
  )
    .then((product) => {
      console.log(product);
      res.redirect(`available-products/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get purchase requests
exports.getPurchaseRequests = (req, res, next) => {
  distributorID = req.params.userId;
  const userId = distributorID;
  // console.log(userId);
  User.findById(userId)
    .then((user) => {
      Product.find({
        "distributor.User": userId,
        "retailer.ordered": true,
        "retailer.orderConfirmed": false,
      })
        .then((products) => {
          // console.log(products);
          res.render("distributor/purchase-requests", {
            path: "/distributor/purchase-requests",
            role: "distributor",
            title: "Purchase Requests",
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

// post decline order
exports.postDeclineOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = distributorID;
  // console.log(batchNum, userId);

  Product.updateOne(
    { "distributor.User": userId, batchNum: batchNum },
    {
      $set: {
        retailer: {
          User: crypto.randomBytes(12).toString("hex"),
          ordered: false,
          orderConfirmed: false,
        },
      },
    }
  )
    .then((product) => {
      console.log(product);
      res.redirect(`purchase-requests/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// post comfirm order
exports.postConfirmOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = distributorID;
  // console.log(batchNum, userId);

  Product.updateOne(
    { batchNum: batchNum, "distributor.User": userId },
    {
      $set: {
        "retailer.orderConfirmed": true,
      },
    }
  )
    .then((product) => {
      console.log(product);
      res.redirect(`/distributor/purchase-requests/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get purchased products
exports.getPurchasedProduct = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const userId = user._id;
      Product.find({
        "distributor.User": userId,
        "distributor.orderConfirmed": true,
      })
        .then((products) => {
          res.render("distributor/purchased-products", {
            path: "/distributor/purchased-products",
            role: "distributor",
            title: "Purchased Products",
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

// get sold products
exports.getSoldProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      // const distributorId = user._id;
      Product.find({
        "distributor.User": userId,
        "retailer.orderConfirmed": true,
      })
        .then((products) => {
          res.render("distributor/sold-products", {
            path: "/distributor/sold-products",
            role: "distributor",
            title: "sold Products",
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
