import { db } from "@/lib/db";
import List from "./list";
import { Logger } from "@/lib/logger";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page(props: { searchParams: SearchParams }) {
	using logger = new Logger();

	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(props.searchParams)) {
		if (typeof value === "string") {
			params.append(key, value);
		} else if (Array.isArray(value)) {
			value.forEach((v) => params.append(key, v));
		}
	}

	const filterCategories = params.getAll("category");

	const events = await db.events.getFiltered(filterCategories, 0);
	const categories = await db.categories.getAll();

	logger.debug("searchParams", { searchParams: params.toString() });

	return <List events={events} categories={categories} filterCategories={filterCategories} />;
}
