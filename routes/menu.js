const express = require("express");
const router = express.Router();
const {
  HandleGetMenu,
  HandleAddMenuItem,
  HandleDeleteMenuItem,
  HandleGetItemByTaste
} = require("../controllers/menu");

router.get("/", HandleGetMenu);
router.post("/", HandleAddMenuItem);
router.delete("/:id", HandleDeleteMenuItem);
router.get("/:tasteType", HandleGetItemByTaste);


module.exports = router;
