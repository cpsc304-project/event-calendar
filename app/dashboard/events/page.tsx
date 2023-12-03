import { db } from "@/lib/db";
import List from "./list";
import { Prefetch } from "./prefetch";
import { Logger } from "next-axiom";
import { FilterProvider } from "./clientStore";
import { Filter } from "./sharedStore";
import { getEvents } from "./actions";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page(props: { searchParams: SearchParams }) {
	const logger = new Logger();
	try {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(props.searchParams)) {
			if (typeof value === "string") {
				params.append(key, value);
			} else if (Array.isArray(value)) {
				value.forEach((v) => params.append(key, v));
			}
		}

		const filter = params.get("filter") ?? "none";
		const categories = params.getAll("categories");
		const events = await getEvents({ filter: filter as Filter, categories }, 0);
		const allCategories = await db.categories.getAll();

		logger.debug("Rendering /dashboard/events", {
			searchParams: params.toString(),
			filter,
			categories,
		});

		const prefetch: Prefetch = {
			events,
			filters: { filter: filter as Filter, categories },
		};

		return (
			<FilterProvider filter={filter as Filter} categories={categories}>
				<List prefetch={prefetch} allCategories={allCategories} />
			</FilterProvider>
		);
	} finally {
		logger.flush();
	}
}
