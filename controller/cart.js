const cartModel = require("../model/cart");
const productModel = require("../model/product");

exports.add = async (req, res) => {
  var product = req.body.productId;
  if (!product) {
    res.status(404).send("Enter product");
  }
  var quantity = req.body.quantity;
  if (!quantity) {
    res.status(404).send("Enter quantity");
  }

  productModel.findById(product).then(async data => {
    console.log("data", data);
    if (data) {
      if (data.quantity < quantity) {
        res.send("you have reached maximum quantity");
      } else {
        var updatedQuantity = data.quantity - quantity;
        await productModel.findByIdAndUpdate(
          data._id,
          { $set: { quantity: updatedQuantity } },
          { new: true, upsert: true }
        );
        var cart = new cartModel({
          productId: product,
          quantity: quantity
        });
        cart.save().then(data => {
          res.status(200).send(data);
        }).catch(err => {
          console.log(err);
        });
      }
    }
  });
};

exports.updateQuantity = async (req, res) => {
  var cartId = req.body.cartId;
  if (!cartId) {
    res.status(404).send("Enter cartId");
  }
  var quantity = req.body.quantity;
  if (!quantity) {
    res.status(404).send("Enter quantity");
  }

  if (quantity == 0) {
    cartModel
      .findById(cartId)
      .then(async data => {
        var productData = await productModel.findById(data.productId).exec();
        productModel
          .findByIdAndUpdate(
            data.productId,
            { $set: { quantity: productData.quantity + data.quantity } },
            { new: true, upsert: true }
          )
          .exec();
      })
      .catch(err => {
        console.log(err);
      });
    cartModel
      .findOneAndDelete(cartId)
      .then(() => {
        res.status(200).send("Cart empty");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    cartModel
      .findById(cartId)
      .then(async data => {
        if (data.quantity == quantity) {
          res.status(200).send(data);
        }
        var productData = await productModel.findById(data.productId).exec();
        await productModel
          .findByIdAndUpdate(
            data.productId,
            {
              $set: {
                quantity:
                  parseInt(productData.quantity) +
                  (parseInt(data.quantity) - parseInt(quantity))
              }
            },
            { new: true, upsert: true }
          )
          .exec();
      })
      .catch(err => {
        console.log(err);
      });
    cartModel
      .findByIdAndUpdate(
        cartId,
        { $set: { quantity: quantity } },
        { new: true, upsert: true }
      )
      .then(async data => {
        if (data) {
          res.status(200).send(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
