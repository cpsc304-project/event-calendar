import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { EventDetails } from "./eventDetails";
import { EventGetByEventId } from "@/lib/schema";

export default async function Page(props: { params: { event_id: string } }) {
	const event_id = Number(props.params.event_id);
	let event: EventGetByEventId;
	try {
		event = await db.events.getByEventId(event_id);
		if (!event) {
			notFound();
		}
	} catch (error) {
		notFound();
	}

	const reviews = await db.reviews.getAllByEventId(event_id);
	const categories = await db.categories.getCategoriesByEventId(event_id);

	return <EventDetails event={event} reviews={reviews} categories={categories} />;
}
