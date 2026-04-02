const express = require("express");
const app = express();

app.use(express.json());

const orders = [];

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/create-order", (req, res) => {
  const { amount, currency = "RON" } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Missing amount" });
  }

  const order = {
    id: "order_" + Date.now(),
    amount,
    currency,
    status: "PENDING"
  };

  orders.push(order);

  res.json({
    message: "Order created",
    order
  });
});

app.get("/order/:id", (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);

  const { orderId, status } = req.body;

  const order = orders.find(o => o.id === orderId);

  if (order) {
    order.status = status;
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
