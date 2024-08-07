const express = require('express');
const {
  getAllInventory,
  getInventoryByProductName,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryByUserId // Importa la nueva función
} = require('../controllers/inventoryController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/getAll', verifyToken, getAllInventory);
router.get('/:productName', verifyToken, getInventoryByProductName);
router.get('/user/:userId', verifyToken, getInventoryByUserId); // Nueva ruta
router.post('/create', verifyToken, createInventory);
router.put('/update', verifyToken, updateInventory);
router.delete('/delete/:id', verifyToken, deleteInventory);

module.exports = router;
