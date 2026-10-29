import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL must be set to run seed (Postgres connection string).');
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  const seedFile = path.join(process.cwd(), 'db', 'seed.sql');
  if (!fs.existsSync(seedFile)) {
    console.log('No seed.sql found in db/. Skipping.');
    await client.end();
    return;
  }
  const sql = fs.readFileSync(seedFile, 'utf-8');
  await client.query(sql);
  await client.end();
  console.log('Seeding complete.');
}

run().catch(e => { console.error(e); process.exit(1); });
