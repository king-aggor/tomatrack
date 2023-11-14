// local  modules
const User = require("../models/user"); //importing User model
const Product = require("../models/product"); //importing Product model

// core modules
const crypto = require("crypto"); //importing crypto modules

let retailerId;
// get all retailer products
exports.getAllProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const retailerId = user._id;
      Product.find({
        "retailer.User": retailerId,
        "retailer.orderConfirmed": true,
      })
        .then((products) => {
          // console.log(products);
          res.render("retailer/all-products", {
            path: "/retailer/all-products",
            role: "retailer",
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

// get available products for sale
exports.getAvailableProducts = (req, res, next) => {
  retailerId = req.params.userId;
  User.findById(retailerId)
    .then((user) => {
      Product.find({
        "distributor.orderConfirmed": true,
        "retailer.orderConfirmed": false,
      })
        .then((products) => {
          res.render("retailer/available-products", {
            path: "/retailer/available-products",
            role: "retailer",
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
  const userId = retailerId;
  // console.log(batchNum, userId);
  User.findById(userId)
    .then((user) => {
      // console.log(user);
      Product.findOne({ batchNum: batchNum })
        .then((prod) => {
          // console.log(product);
          Product.updateOne(
            { batchNum: batchNum },
            {
              $set: {
                retailer: {
                  User: userId,
                  ordered: true,
                  retailer_name: user.orgName,
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
          )
            .then((product) => {
              console.log(product);
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
  const userId = retailerId;

  Product.updateOne(
    { "retailer.User": userId, batchNum: batchNum },
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
      res.redirect(`available-products/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get purchased products
exports.getPurchasedProducts = (req, res, next) => {
  const retailerId = req.params.userId;
  // console.log(retailerId);
  User.findById(retailerId)
    .then((user) => {
      // console.log(user);
      Product.find({
        "retailer.User": retailerId,
        "retailer.orderConfirmed": true,
      })
        .then((products) => {
          res.render("retailer/purchased-products", {
            path: "/retailer/purchased-products",
            role: "retailer",
            title: "Purchaseed Products",
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

// get QRcodeGenerator page
exports.getQRcodeGenerator = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId)
    .then((product) => {
      // extract retailer id from product
      const retailerId = product.retailer.User;
      // find retailer
      User.findById(retailerId)
        .then((user) => {
          res.render("retailer/QRcode-generator", {
            path: "/retailer/QRcode-generator",
            role: "retailer",
            title: "QRcode Generator",
            prod: product,
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
