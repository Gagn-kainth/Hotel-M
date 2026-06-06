const express = require("express");
const router = express.Router();
const {
  HandleGetMenu,
  HandleAddMenuItem,
  HandleDeleteMenuItem,
  HandleGetItemByTaste,
  HandleUpdateMenuData,
} = require("../controllers/menu");

router.get("/", HandleGetMenu);
router.post("/", HandleAddMenuItem);
router.delete("/:id", HandleDeleteMenuItem);
router.get("/:tasteType", HandleGetItemByTaste);
router.put("/:id",HandleUpdateMenuData)


module.exports = router;
