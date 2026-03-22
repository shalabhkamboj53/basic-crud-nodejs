const express = require("express");

const validateItem = require("../middleware/validateItem");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../data/itemsStore");

const router = express.Router();

function parseId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

router.get("/", (req, res) => {
  res.status(200).json({ data: getAllItems() });
});

router.get("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  const item = getItemById(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({ data: item });
});

router.post("/", validateItem, (req, res) => {
  const item = createItem(req.body.name);
  res.status(201).json({ data: item });
});

router.put("/:id", validateItem, (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  const item = updateItem(id, req.body.name);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({ data: item });
});

router.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  const removed = deleteItem(id);
  if (!removed) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(204).send();
});

module.exports = router;
