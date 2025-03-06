// test-db-connection.ts
import { config } from 'dotenv';
import { Client } from 'pg';

// Load .env file
config();

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log('Successfully connected to PostgreSQL');

    // Test query
    const res = await client.query('SELECT NOW()');
    console.log('Current database time:', res.rows[0].now);

    await client.end();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
