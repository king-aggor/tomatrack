// local modules
const Product = require("../models/product"); //importing Product model
const User = require("../models/user"); //importing User model

let userId;
// post add product( To post farmer's new product)
exports.postAddProduct = (req, res, next) => {
  // const userId = req.params.userID;
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
        farmer: { User: farmerId },
        "farmer.farmer_name": user.orgName,
        "wholesaler.purchased": false,
        "distributor.purchased": false,
        "retailer.purchased": false,
      })
        .then((product) => {
          console.log(product);
          // console.log(userId);
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
        "wholesaler.User": { $exists: true },
      })
        .then((products) => {
          for (let wholesaler of products) {
            User.find({ _id: wholesaler.wholesaler.User })
              .then((wholesalers) => {
                res.render("farmer/sold-products", {
                  path: "/farmer/sold-products",
                  role: "farmer",
                  title: "Sold Products",
                  prods: products,
                  user: user,
                  wholesalers: wholesalers,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
        "wholesaler.User": { $exists: false },
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
