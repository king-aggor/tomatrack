// local modules
const User = require("../models/user"); //importing User model
const Product = require("../models/product");

// let distributorID;
// get all distributor's products
exports.getAllProducts = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const userID = user._id;
      Product.find({ "distributor.User": userID })
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
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      Product.find({
        "wholesaler.User": { $exists: true },
        "distributor.purchased": false,
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
  const userId = req.body.distributorid;
  const prodId = req.body.batchNum;

  User.findById(userId)
    .then((user) => {
      console.log(user.orgName);
      Product.updateOne(
        { batchNum: prodId },
        {
          $set: {
            "distributor.User": userId,
            "distributor.purchased": true,
            "distributor.distributor_name": user.orgName,
          },
        }
      ).then((product) => {
        res.redirect(`available-products/${userId}`);
      });
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
        "distributor.purchased": true,
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
      const distributorId = user._id;
      Product.find({
        "distributor.User": distributorId,
        "retailer.purchased": true,
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
