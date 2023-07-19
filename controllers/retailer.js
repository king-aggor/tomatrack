// get all retailer products
exports.getRetailerAllProducts = (req, res, next) => {
  res.render("retailer/all-products", {
    path: "/retailer/all-products",
    role: "retailer",
    title: "All Products",
  });
};
