const products = [];

module.exports = class Product {
  constructor(batchNum, variety, weight, price, harvestDate) {
    this.batchNum = batchNum;
    this.variety = variety;
    this.weight = weight;
    this.price = price;
    this.harvestDate = harvestDate;
  }
};
