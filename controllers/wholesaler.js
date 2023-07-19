// get all products avilable to wholesaler
exports.getAvailableProducts = (req, res, next) => {
  res.render("wholesaler/available-products", {
    path: "/wholesaler/available-products",
    role: "wholesaler",
  });
};
