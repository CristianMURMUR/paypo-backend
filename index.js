const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.post("/create-order", (req, res) => {
  const { amount, currency = "RON", orderId } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Missing amount" });
  }

  res.json({
    message: "Mock PayPo order created",
    orderId: orderId || "order_" + Date.now(),
    amount,
    currency,
    redirectUrl: "https://example.com/paypo-checkout"
  });
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
