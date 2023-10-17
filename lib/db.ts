import { ExecutedQuery, Field, connect } from "@planetscale/database";
import "server-only";
import { messages } from "./controller";

const connection = connect({
	host: process.env.PLANETSCALE_DB_HOST,
	username: process.env.PLANETSCALE_DB_USERNAME,
	password: process.env.PLANETSCALE_DB_PASSWORD,
});

let currentFetchTags: string[] | undefined = undefined;

const cachedConnection = connect({
	fetch: async (input, init) =>
		fetch(input, { ...init, cache: "force-cache", next: { tags: currentFetchTags } }),
	host: process.env.PLANETSCALE_DB_HOST,
	username: process.env.PLANETSCALE_DB_USERNAME,
	password: process.env.PLANETSCALE_DB_PASSWORD,
});

type ExecuteArgs = object | any[] | null;
type Cast = (field: Field, value: string | null) => any;
type ExecuteAs = "array" | "object";
type ExecuteOptions = {
	as?: ExecuteAs;
	cast?: Cast;
};

const executeCached = async (
	query: string,
	args?: ExecuteArgs,
	options?: ExecuteOptions & { tags?: string[] | undefined },
): Promise<ExecutedQuery> => {
	const previousFetchTags = currentFetchTags;
	currentFetchTags = options?.tags;
	const result = await cachedConnection.execute(query, args, options);
	currentFetchTags = previousFetchTags;
	return result;
};

export const db = {
	execute: connection.execute.bind(connection),
	transaction: connection.transaction.bind(connection),
	refresh: connection.refresh.bind(connection),
	executeCached,
	messages,
};

void db.executeCached("SET @@boost_cached_queries = true");
