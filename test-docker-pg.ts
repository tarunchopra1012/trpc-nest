// test-docker-pg.ts
import { Client } from 'pg';

async function testDockerPg() {
  // Hardcoded connection details for Docker PostgreSQL
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'product_db',
  });

  try {
    console.log('Attempting to connect to Docker PostgreSQL...');
    await client.connect();
    console.log('Connected successfully!');

    // Test query
    const res = await client.query('SELECT current_user, current_database()');
    console.log('Current user:', res.rows[0].current_user);
    console.log('Current database:', res.rows[0].current_database);

    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testDockerPg();
// This script connects to a Docker container running PostgreSQL using the hard-coded connection details. It then executes a simple query to retrieve the current user and database. You can run this script to test the connection to your Docker PostgreSQL container.
