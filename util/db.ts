import { Pool } from "pg";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: Number(process.env.PGSQL_PORT)!,
    database: process.env.PGSQL_DATABASE,
    ssl: true
  });
}

export default conn as Pool;