// local modules
// const product = require("../models/product");
const Product = require("../models/product"); //importing Product model
const User = require("../models/user"); // importing User model

// core modules
const crypto = require("crypto"); //importing crypto module

let wholesalerId;

// get all products of wholesalers
exports.getAllProducts = (req, res, next) => {
  wholesalerId = req.params.userId;
  // const userId = wholesalerId;
  User.findById(wholesalerId)
    .then((user) => {
      const wholesalerId = user._id;
      Product.find({
        "wholesaler.User": wholesalerId,
        "wholesaler.orderConfirmed": true,
      })
        .then((products) => {
          console.log(products);
          res.render("wholesaler/all-products", {
            path: "/wholesaler/all-products",
            role: "wholesaler",
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

// get all products avilable to wholesaler
exports.getAvailableProducts = (req, res, next) => {
  wholesalerId = req.params.userId;
  User.findById(wholesalerId)
    .then((user) => {
      // console.log(user.orgName);
      Product.find({
        "farmer.User": { $exists: true },
        "wholesaler.orderConfirmed": false,
      })
        .then((products) => {
          // console.log(products);
          res.render("wholesaler/available-products", {
            path: "/wholesaler/available-products",
            role: "wholesaler",
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
  const prodId = req.body.batchNum;
  const userId = wholesalerId;
  // console.log(prodId, userId);
  User.findById(userId)
    .then((user) => {
      Product.findOne({ batchNum: prodId })
        .then((prod) => {
          Product.updateOne(
            { batchNum: prodId },
            {
              $set: {
                wholesaler: {
                  User: userId,
                  ordered: true,
                  wholesaler_name: user.orgName,
                  location: {
                    country: user.country,
                    region: user.region,
                  },
                  price: ((prod.price * 20) / 100 + prod.price).toFixed(2),
                  ordered: true,
                  orderConfirmed: false,
                },
              },
            }
          ).then((product) => {
            console.log(product);
            res.redirect(`available-products/${userId}`);
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

// post cancel order(To cancel wholesaler's placed order)
exports.postCancelOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = req.body.userId;

  Product.updateOne(
    { "wholesaler.User": userId, batchNum: batchNum },
    {
      $set: {
        wholesaler: {
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

//  get product purchased by wholesaler
exports.getPurchasedProducts = (req, res, next) => {
  const wholesalerId = req.params.userId;
  User.findById(wholesalerId)
    .then((user) => {
      Product.find({
        "wholesaler.User": wholesalerId,
        "wholesaler.orderConfirmed": true,
      })
        .then((products) => {
          res.render("wholesaler/purchased-products", {
            path: "/wholesaler/purchased-products",
            role: "wholesaler",
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

// get purchase requests
exports.getPurchaseRequests = (req, res, next) => {
  const userId = req.params.userId;
  // console.log(userId);
  User.findById(userId)
    .then((user) => {
      Product.find({
        "wholesaler.User": userId,
        "distributor.ordered": true,
        "distributor.orderConfirmed": false,
      })
        .then((products) => {
          res.render("wholesaler/purchase-requests", {
            path: "/wholesaler/purchase-requests",
            role: "wholesaler",
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

// to decline purchase order
exports.postDeclineOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = req.body.userId;

  Product.updateOne(
    { "wholesaler.User": userId, batchNum: batchNum },
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
      res.redirect(`purchase-requests/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// post confirm order
exports.postConfirmOrder = (req, res, next) => {
  const batchNum = req.body.batchNum;
  const userId = req.body.userId;
  console.log(batchNum, userId);

  Product.updateOne(
    { batchNum: batchNum, "wholesaler.User": userId },
    {
      $set: {
        "distributor.orderConfirmed": true,
      },
    }
  )
    .then((product) => {
      console.log(product);
      res.redirect(`/wholesaler/purchase-requests/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get products sold by wholesaler
exports.getSoldProducts = (req, res, next) => {
  const wholesalerId = req.params.userId;
  User.findById(wholesalerId)
    .then((user) => {
      const wholesalerId = user._id;
      Product.find({
        "wholesaler.User": wholesalerId,
        "distributor.orderConfirmed": true,
      })
        .then((products) => {
          res.render("wholesaler/sold-products", {
            path: "/wholesaler/sold-products",
            role: "wholesaler",
            title: "Sold Products",
            prods: products,
            user: user,
            // distributors: distributors,
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
