import { neon, NeonQueryPromise } from "@neondatabase/serverless";
import { messages, files, accounts, events, categories, tickets, venues } from "./controller";
import "server-only";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL in environment");
}

const fetchOptions: Required<Pick<RequestInit, "cache" | "next">> = {
	cache: "no-store",
	next: {},
};

const sqlUntyped = neon(process.env.DATABASE_URL, { fetchOptions });

const sql = <T extends unknown[]>(
	strings: TemplateStringsArray,
	...params: any[]
): NeonQueryPromise<false, false, T> =>
	sqlUntyped(strings, ...params) as NeonQueryPromise<false, false, T>;

const cached = async <ArrayMode extends boolean, FullResults extends boolean, T>(
	tag: string,
	query: NeonQueryPromise<ArrayMode, FullResults, T>,
): Promise<T> => {
	const previousCache = fetchOptions.cache;
	const previousTags = fetchOptions.next.tags;
	fetchOptions.cache = "force-cache";
	fetchOptions.next.tags = [tag];
	const result = await query;
	fetchOptions.cache = previousCache;
	fetchOptions.next.tags = previousTags;
	return result;
};

export const db = {
	sql,
	cached,
	messages,
	files,
	accounts,
	events,
	categories,
	tickets,
	venues,
};
