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

// get retailer purchased products
exports.getQRcodeGenerator = (req, res, next) => {
  res.render("retailer/QRcode-generator", {
    path: "/retailer/QRcode-generator",
    role: "retailer",
    title: "QRcode Generator",
  });
};
