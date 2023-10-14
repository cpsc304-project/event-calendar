import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import "server-only";

let databaseFetchOverrides: RequestInit = {};

const connection = connect({
	fetch: async (input, init) => fetch(input, { ...init, ...databaseFetchOverrides }),
	host: process.env.PLANETSCALE_DB_HOST,
	username: process.env.PLANETSCALE_DB_USERNAME,
	password: process.env.PLANETSCALE_DB_PASSWORD,
});

const db = drizzle(connection);

export const withFetchOptions =
	<T>(execute: () => Promise<T>, overrides: RequestInit) =>
	async (): Promise<T> => {
		const previous = databaseFetchOverrides;
		databaseFetchOverrides = overrides;
		const result = await execute();
		databaseFetchOverrides = previous;
		return result;
	};

export default db;
