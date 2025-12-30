import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";

const connet = await mysql.createConnection(process.env.DATABASE);

export const db = drizzle(connet);
