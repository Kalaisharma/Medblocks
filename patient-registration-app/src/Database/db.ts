import { PGlite } from '@electric-sql/pglite';
//persistence is achieved by initializing the database with the appropriate dataDir prefix idb://
const db = new PGlite('idb://patient-db');

export const initDB = async () => {
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
export default db;
