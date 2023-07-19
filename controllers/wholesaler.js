// get all products avilable to wholesaler
exports.getAvailableProducts = (req, res, next) => {
  res.render("wholesaler/available-products", {
    path: "/wholesaler/available-products",
    role: "wholesaler",
  });
};

// get all products of wholesalers
exports.getAllProducts = (req, res, next) => {
  res.render("wholesaler/all-products", {
    path: "/wholesaler/all-products",
    role: "wholsaler",
  });
};

// get product purchased by wholesaler
exports.getPurchasedProducts = (req, res, next) => {
  res.render("wholesaler/purchased-products", {
    path: "/wholesaler/purchased-products",
    role: "wholsaler",
  });
};
