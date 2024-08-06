// src/controllers/inventoryController.js
const { pool } = require('../config/database');
const axios = require('axios');

// Middleware para verificar el token JWT
const verifyToken = require('../middleware/authMiddleware');

const getAllInventory = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Inventory WHERE user_id = $1', [userId]);
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).send('Error fetching inventory');
  }
};

const getInventoryByProductName = async (req, res) => {
  const { id: userId } = req.user;
  const { productName } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM Inventory WHERE user_id = $1 AND product_name ILIKE $2',
      [userId, `%${productName}%`]
    );
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory by product name:', error);
    res.status(500).send('Error fetching inventory by product name');
  }
};

const createInventory = async (req, res) => {
  const { product_name, quantity, price } = req.body;
  const { id: user_id } = req.user;

  if (!product_name || !quantity || !price || !user_id) {
    return res.status(400).send('All fields are required');
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Inventory (product_name, quantity, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_name, quantity, price, user_id]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).send('Error creating inventory');
  }
};

const updateInventory = async (req, res) => {
  const { id, product_name, quantity, price } = req.body;

  if (!id || !product_name || !quantity || !price) {
    return res.status(400).send('All fields are required');
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE Inventory SET product_name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *',
      [product_name, quantity, price, id]
    );
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).send('Error updating inventory');
  }
};

const deleteInventory = async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM Inventory WHERE id = $1 RETURNING *', [id]);
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).send('Error deleting inventory');
  }
};

module.exports = {
  getAllInventory,
  getInventoryByProductName,
  createInventory,
  updateInventory,
  deleteInventory,
};
