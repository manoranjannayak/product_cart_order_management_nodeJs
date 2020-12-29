const orderModel = require("../model/order");
const cartModel = require("../model/cart");

exports.create = async (req, res) => {
  var cartId = req.body.cartId;
  if (!cartId) {
    res.status(404).send("Enter cartId");
  }

  cartModel
    .findById(cartId)
    .then(async data => {
      console.log("data", data);
      if (data) {
        var order = new orderModel({
          productId: data.productId,
          quantity: data.quantity
        });

        order
          .save()
          .then(data => {
            cartModel.findByIdAndDelete(cartId).exec();
            res.status(200).send(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.update = async (req, res) => {
  var orderId = req.body.orderId;
  if (!orderId) {
    res.status(404).send("Enter orderId");
  }

  var status = req.body.status;
  if (!status) {
    res.status(404).send("Enter status");
  }

  await orderModel
    .findByIdAndUpdate(
      orderId,
      { $set: { status: status } },
      { new: true, upsert: true }
    )
    .then(data => {
        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('delivered',{message:"Order delivered",data:data})
      res.status(200).send(data);
    });
};
