const express = require("express");
const router = express.Router();

const controller = require("../controllers/orderController");

router.post("/create-order", controller.createOrder);
router.get("/order/:id", controller.getOrder);

module.exports = router;