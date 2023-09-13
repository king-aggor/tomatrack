const products = [];

module.exports = class Product {
  constructor(batchNum, variety, weight, price, harvestDate) {
    this.batchNum = batchNum;
    this.variety = variety;
    this.weight = weight;
    this.price = price;
    this.harvestDate = harvestDate;
  }
  // function to save user input in product array
  save() {
    products.push(this);
  }

  //   function to fetch products from products array
  static fetchAll() {
    return products;
  }
};
