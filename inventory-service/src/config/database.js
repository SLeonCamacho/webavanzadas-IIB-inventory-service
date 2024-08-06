const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS Inventory (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(100),
        quantity INTEGER,
        price DECIMAL,
        user_id INTEGER
      );
    `);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    client.release();
  }
};

const insertDefaultData = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO Inventory (product_name, quantity, price, user_id)
      VALUES 
        ('Product1', 10, 9.99, 1),
        ('Product2', 20, 19.99, 2)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  createTables,
  insertDefaultData,
};
