// local  modules
const User = require("../models/user"); //importing User model
const Product = require("../models/product"); //importing Product model

// get all retailer products
exports.getAllProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const retailerId = user._id;
      Product.find({ "retailer.User": retailerId })
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
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      Product.find({
        "distributor.User": { $exists: true },
        "retailer.purchased": false,
      })
        .then((products) => {
          // console.log(products);
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
  const prodId = req.body.prodId;
  const userId = req.body.userId;
  User.findById(userId)
    .then((user) => {
      Product.updateOne(
        { _id: prodId },
        {
          $set: {
            // "retailer.User": userId,
            // "retailer.purchased": true,
            // "retailer.retailer_name": retailer.orgName,
            retailer: {
              User: userId,
              purchased: true,
              retailer_name: user.orgName,
              location: {
                country: user.country,
                region: user.region,
              },
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
};

// get purchased products
exports.getPurchasedProducts = (req, res, next) => {
  const retailerId = req.params.userId;
  User.findById(retailerId)
    .then((user) => {
      // console.log(user);
      Product.find({ "retailer.User": retailerId, "retailer.purchased": true })
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
