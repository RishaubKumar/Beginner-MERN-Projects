const express  = require('express');
const router = express.Router();
const ItemController = require("../controllers/itemController");

router.get("/",ItemController.getItems);
router.post("/",ItemController.addItem);
router.put("/:id",ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;