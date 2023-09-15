// local modules
const Product = require("../models/product"); //importing Product class from product model

// post add product( To post farmer's new product)
exports.postAddProduct = (req, res, next) => {
  // create an instance of Product class
  const product = new Product(
    req.body.batchNum,
    req.body.variety,
    req.body.weight,
    req.body.price,
    req.body.harvestDate
  );
  // save product to product array
  product.save();
  // console.log(product);
  res.redirect("all-products");
};

// get farmer all products( To display all produce of farmers)
exports.getFarmerAllProduts = (req, res, next) => {
  // declear varible to store fetched products
  const products = Product.fetchAll();
  console.log(products);
  res.render("farmer/all-products", {
    path: "/farmer/all-products",
    role: "farmer",
    title: "All Products",
    prods: products,
  });
};

// get farmer's sold products( To display produce sold by farmer)
exports.getFarmerSoldProducts = (req, res, next) => {
  res.render("farmer/sold-products", {
    path: "/farmer/sold-products",
    role: "farmer",
    title: "Sold Products",
  });
};

// get farmer's available products( To display farmer's avilable produce)
exports.getFarmerAvailableProducts = (req, res, next) => {
  res.render("farmer/available-products", {
    path: "/farmer/available-products",
    role: "farmer",
    title: "Available Products",
  });
};
