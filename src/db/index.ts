import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
};

export const pool = databaseUrl
  ? (globalForDb.__pool ?? new Pool({ connectionString: databaseUrl }))
  : null;

if (pool && process.env.NODE_ENV !== "production") {
  globalForDb.__pool = pool;
}

export const db = pool ? drizzle(pool) : null;
