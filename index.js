const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const orderSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  status: String
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/create-order", async (req, res) => {
  const { amount, currency = "RON" } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Missing amount" });
  }

  const order = await Order.create({
    amount,
    currency,
    status: "PENDING"
  });

  res.json({
    message: "Order created",
    order
  });
});

app.get("/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

app.post("/webhook", async (req, res) => {
  const { orderId, status } = req.body;

  await Order.findByIdAndUpdate(orderId, { status });

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});