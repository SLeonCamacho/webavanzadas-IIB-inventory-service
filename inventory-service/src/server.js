require('dotenv').config();
const express = require('express');
const { createTables, insertDefaultData } = require('./config/database');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;

// Rutas para crear tablas e insertar datos por defecto
app.get('/create-tables', async (req, res) => {
  await createTables();
  res.send('Tables created successfully');
});

app.get('/insert-data', async (req, res) => {
  await insertDefaultData();
  res.send('Data inserted successfully');
});

// Rutas de inventario
app.use('/', inventoryRoutes);

// Endpoint para probar la conexión
app.get('/', (req, res) => {
  res.send('Inventory service running');
});

app.listen(port, () => {
  console.log(`Inventory service running on docker port ${process.env.PORT_DOCKER}`);
});
