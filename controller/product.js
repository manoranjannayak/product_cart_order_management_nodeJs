const productModel = require("../model/product");

exports.create = async (req, res) => {
  var product = [
    {
      name: "iphone 11",
      quantity: 10
    },
    { name: "iphone 12", quantity: 10 }
  ];

  productModel.insertMany(product).then((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};
