// local modules
// const product = require("../models/product");
const Product = require("../models/product"); //importing Product model
const User = require("../models/user"); // importing User model

// get all products avilable to wholesaler
exports.getAvailableProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      // console.log(user.orgName);
      Product.find({
        "farmer.User": { $exists: true },
        "wholesaler.purchased": false,
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

// get all products of wholesalers
exports.getAllProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const wholesalerId = user._id;
      Product.find({ "wholesaler.User": wholesalerId })
        .then((products) => {
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

// post buy product
exports.postBuyProduct = (req, res, next) => {
  const prodId = req.body.batchNum;
  const userId = req.body.userId;
  User.findById(userId)
    .then((wholesaler) => {
      Product.updateOne(
        { batchNum: prodId },
        {
          $set: {
            "wholesaler.User": userId,
            "wholesaler.purchased": true,
            "wholesaler.wholesaler_name": wholesaler.orgName,
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
};

//  get product purchased by wholesaler
exports.getPurchasedProducts = (req, res, next) => {
  const wholesalerId = req.params.userId;
  User.findById(wholesalerId)
    .then((user) => {
      Product.find({
        "wholesaler.User": wholesalerId,
        "wholesaler.purchased": true,
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

// get products sold by wholesaler
exports.getSoldProducts = (req, res, next) => {
  User.findById("6512f9fbac8aea390a33b783")
    .then((user) => {
      const wholesalerId = user._id;
      Product.find({
        "wholesaler.User": wholesalerId,
        "distributor.purchased": true,
      })
        .then((products) => {
          res.render("wholesaler/sold-products", {
            path: "/wholesale/sold-products",
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
