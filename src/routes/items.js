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

/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Shalabh
 *     ItemInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Shalabh
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

function parseId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * @openapi
 * /emp:
 *   get:
 *     summary: Get all items
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 */

router.get("/", (req, res) => {
  res.status(200).json({ data: getAllItems() });
});

/**
 * @openapi
 * /emp/{id}:
 *   get:
 *     summary: Get item by id
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Found item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @openapi
 * /emp:
 *   post:
 *     summary: Create a new item
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Created item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post("/", validateItem, (req, res) => {
  const item = createItem(req.body.name);
  res.status(201).json({ data: item });
});

/**
 * @openapi
 * /emp/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Updated item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid id or invalid payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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

/**
 * @openapi
 * /emp/{id}:
 *   delete:
 *     summary: Delete item by id
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item deleted
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
