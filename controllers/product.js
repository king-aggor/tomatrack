// local modules
const Product = require("../models/product");

// get product page
exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findOne({ batchNum: prodId })
    .then((product) => {
      res.render("product/product-details", {
        title: "Product",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // res.render("product/product-details", { title: "Product" });
};
