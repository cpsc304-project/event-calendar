import { db } from "@/lib/db";
import List from "./list";
import { Logger } from "next-axiom";
import { Event } from "@/lib/schema";

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

		const filterPopular = params.get("popular") === "true";
		const filterDeals = params.get("deals") === "true";
		const filterCategories = params.getAll("category");

		let events: Event[];
		if (filterPopular) {
			console.log("sending popular events");
			events = await db.events.getPopular(0);
		} else if (filterDeals) {
			console.log("sending deals events");
			events = await db.events.getDeals(0);
		} else {
			console.log("sending filtered events");
			events = await db.events.getFiltered(filterCategories, 0);
		}

		const categories = await db.categories.getAll();

		logger.debug("searchParams", { searchParams: params.toString() });

		return (
			<List
				events={events}
				categories={categories}
				filterCategories={filterCategories}
				filterPopular={filterPopular}
				filterDeals={filterDeals}
			/>
		);
	} finally {
		logger.flush();
	}
}
