// local modules
const Product = require("../models/product"); //importing Product class from product model

// get all products avilable to wholesaler
exports.getAvailableProducts = (req, res, next) => {
  // declear variable to store fetched products (all fatmer products)
  const products = Product.fetchAll();
  res.render("wholesaler/available-products", {
    path: "/wholesaler/available-products",
    role: "wholesaler",
    title: "Available Products",
    prods: products,
  });
};

// get all products of wholesalers
exports.getAllProducts = (req, res, next) => {
  res.render("wholesaler/all-products", {
    path: "/wholesaler/all-products",
    role: "wholesaler",
    title: "All Products",
  });
};

//  get product purchased by wholesaler
exports.getPurchasedProducts = (req, res, next) => {
  res.render("wholesaler/purchased-products", {
    path: "/wholesaler/purchased-products",
    role: "wholesaler",
    title: "Purchased Products",
  });
};

// get products sold by wholesaler
exports.getSoldProducts = (req, res, next) => {
  res.render("wholesaler/sold-products", {
    path: "/wholesale/sold-products",
    role: "wholesaler",
    title: "Sold Products",
  });
};
