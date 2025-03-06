// typeorm.config.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ProductEntity } from './src/products/entities/product.entity'; // Adjust path as needed

// Load environment variables from .env file
config();

// Log connection details for debugging
console.log('TypeORM Connection Config:');
console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`Port: ${Number(process.env.DB_PORT) || 5432}`);
console.log(`Username: ${process.env.DB_USERNAME || 'postgres'}`);
console.log(`Password: ${process.env.DB_PASSWORD ? '******' : 'not set'}`);
console.log(`Database: ${process.env.DB_NAME || 'product_db'}`);

// Create DataSource configuration
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'product_db',
  entities: [ProductEntity], // Add all your entities here
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations_history',
  logging: true,
});

export default dataSource;
// This configuration file is similar to the one in the previous section, but it uses the DataSource class from TypeORM. It also loads environment variables from the .env file and logs the connection details for debugging purposes.
