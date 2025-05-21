import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patient-db');

export const initDB = async () => {
  alert("Initializing database...");
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      address TEXT NOT NULL,
      contact TEXT NOT NULL,
      email TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
};
initDB();
export default db;
