const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await Order.create({
      amount,
      currency: currency || "RON",
    });

    res.json({
      message: "Order created",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};