const { db } = require('@vercel/postgres');
const {
  contacts
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedContacts(client) {
  try {
    // Create the "contacts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        message VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "contacts" table`, createTable);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding contacts:', error);
    throw error;
  }
}

async function main() {
  console.log('connecting to postgresdb')
  const client = await db.connect();

  await seedContacts(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
