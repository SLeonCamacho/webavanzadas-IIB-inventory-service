// src/routes/inventoryRoutes.js
const express = require('express');
const {
  getAllInventory,
  getInventoryByProductName,
  createInventory,
  updateInventory,
  deleteInventory
} = require('../controllers/inventoryController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/inventory', verifyToken, getAllInventory);
router.get('/inventory/:productName', verifyToken, getInventoryByProductName);
router.post('/inventory/create', verifyToken, createInventory);
router.put('/inventory/update', verifyToken, updateInventory);
router.delete('/inventory/delete/:id', verifyToken, deleteInventory);

module.exports = router;
