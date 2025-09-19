import { drizzle } from "drizzle-orm/neon-http";

// Create a database instance using Drizzle ORM
// process.env.DATABASE_URL is the connection string for your Neon PostgreSQL database

export const db = drizzle(process.env.DATABASE_URL!);
