import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EventDetails } from "./eventDetails";



export default async function Page(props: { params: { event_id: string } }) {
	const event_id = Number(props.params.event_id);
	const event = await db.events.getByEventId(event_id);
	if (!event) {
		redirect("/dashboard/events");
	}

	const reviews = await db.reviews.getAllByEventId(event_id);
	const categories = await db.categories.getCategoriesByEventId(event_id);

	return <EventDetails event ={event} reviews = {reviews} categories = {categories}/>;


}
