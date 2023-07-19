// get all retailer products
exports.getAllProducts = (req, res, next) => {
  res.render("retailer/all-products", {
    path: "/retailer/all-products",
    role: "retailer",
    title: "All Products",
  });
};

// get retailer purchased products
exports.getPurchasedProducts = (req, res, next) => {
  res.render("retailer/purchased-products", {
    path: "/retailer/purchased-products",
    role: "retailer",
    title: "All Products",
  });
};
