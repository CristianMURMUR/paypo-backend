const express = require("express");
const app = express();

app.use(express.json());

// test simplu
app.get("/", (req, res) => {
  res.send("Serverul merge 🚀");
});

// endpoint PayPo (mock)
app.post("/create-order", (req, res) => {
  res.json({
    redirectUrl: "https://example.com/paypo"
  });
});

// webhook (mock)
app.post("/webhook", (req, res) => {
  console.log("Webhook primit:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server pornit pe http://localhost:3000");
});