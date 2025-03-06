// debug-typeorm.ts
import { config } from 'dotenv';
import * as fs from 'fs';

// Load .env file
config();

// Print out environment variables
console.log('Environment variables:');
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);

// Check if .env file exists and print its contents
if (fs.existsSync('.env')) {
  console.log('\n.env file exists. Contents:');
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log(envContent);
} else {
  console.log('\n.env file does not exist in the current directory.');
}
