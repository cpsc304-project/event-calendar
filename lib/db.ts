import postgres from "postgres";
import "server-only";

const url = process.env.DATABASE_URL;

if (!url) {
	throw new Error("Missing DATABASE_URL in environment variables");
}

const sql = postgres(url, {});

export default sql;
