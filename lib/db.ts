import { ExecutedQuery, Field, connect } from "@planetscale/database";
import "server-only";

let currentFetchTags: string[] | undefined = undefined;

export const db = connect({
	host: process.env.PLANETSCALE_DB_HOST,
	username: process.env.PLANETSCALE_DB_USERNAME,
	password: process.env.PLANETSCALE_DB_PASSWORD,
});

const cachedConn = connect({
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

export const dbCached = {
	async execute(
		query: string,
		args?: ExecuteArgs,
		options?: ExecuteOptions & { tags?: string[] | undefined },
	): Promise<ExecutedQuery> {
		const previousFetchTags = currentFetchTags;
		currentFetchTags = options?.tags;
		const result = await cachedConn.execute(query, args, options);
		currentFetchTags = previousFetchTags;
		return result;
	},
};

void dbCached.execute("SET @@boost_cached_queries = true");
