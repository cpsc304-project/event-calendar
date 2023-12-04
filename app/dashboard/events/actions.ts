"use server";

import { db } from "@/lib/db";
import { Logger } from "next-axiom";
import { Event } from "@/lib/schema";
import { FilterProps } from "./sharedStore";

export async function getEvents(filters: FilterProps, page: number) {
	const logger = new Logger();
	try {
		logger.debug("Fetching events.", { filters, page });
		let events: Event[];
		switch (filters.filter) {
			case "none":
				events = await db.events.getFiltered([], page);
				break;
			case "popular":
				events = await db.events.getPopular(page);
				break;
			case "deals":
				events = await db.events.getDeals(page);
				break;
			case "custom":
				events = await db.events.getFiltered(filters.categories, page);
				break;
		}
		logger.debug("Fetched events.", { eventsIds: events.map((e) => e.event_id) });
		return events;
	} finally {
		logger.flush();
	}
}
