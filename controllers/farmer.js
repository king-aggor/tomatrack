// get farmer all products( To display all produce of farmers)
exports.getFarmerAllProduts = (req, res, next) => {
  res.render("farmer/all-products", {
    path: "/farmer/all-products",
    role: "farmer",
  });
};

// get farmer's sold products( To display produce sold by farmer)
exports.getFarmerSoldProducts = (req, res, next) => {
  res.render("farmer/sold-products", {
    path: "/farmer/sold-products",
    role: "farmer",
  });
};

// get farmer's available products( To display farmer's avilable produce)
exports.getFarmerAvailableProducts = (req, res, next) => {
  res.render("farmer/available-products", {
    path: "/farmer/available-products",
    role: "farmer",
  });
};
