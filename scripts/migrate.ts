import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL must be set to run migrations (Postgres connection string).');
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  const sqlDir = path.join(process.cwd(), 'db');
  const files = fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql'));
  for (const f of files) {
    const sql = fs.readFileSync(path.join(sqlDir, f), 'utf-8');
    console.log('Applying', f);
    await client.query(sql);
  }
  await client.end();
  console.log('Migrations applied.');
}

run().catch(e => { console.error(e); process.exit(1); });
