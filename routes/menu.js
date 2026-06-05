const express = require("express");
const router = express.Router();
const {
  HandleGetMenu,
  HandleAddMenuItem,
  HandleDeleteMenuItem,
} = require("../controllers/menu");

router.get("/menu", HandleGetMenu);
router.post("/menu", HandleAddMenuItem);
router.delete("/menu/:id", HandleDeleteMenuItem);

module.exports = router;
