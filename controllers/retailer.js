// get all retailer products
exports.getAllProducts = (req, res, next) => {
  res.render("retailer/all-products", {
    path: "/retailer/all-products",
    role: "retailer",
    title: "All Products",
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
