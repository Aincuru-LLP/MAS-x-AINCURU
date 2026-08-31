import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres(process.env.DATABASE_URL);

async function test() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Connected successfully! Current time:", result[0].now);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await sql.end();
  }
}

test();
