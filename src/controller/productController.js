const data = require("../utils");
const { products, pricing, categories } = data; //No need to use categories array.

class Controller {
  getRecords = async (req, res, next) => {
    try {
      products.forEach((item) => {
        item.price = pricing.find((i) => i.sku === item.sku).price;
      });
      res.send({ message: "Get records successfully!", data: products });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
