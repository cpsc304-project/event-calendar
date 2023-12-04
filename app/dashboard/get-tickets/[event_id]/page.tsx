import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import GetTicketPage from "./get-ticket-page";

export default async function Page(props: { params: { event_id: string } }) {
	const event_id = parseInt(props.params.event_id);
	const event = await db.events.getByEventId(event_id);
	if (!event) {
		redirect("/dashboard/events");
	}
	return <GetTicketPage event={event} ticket_price={400} />;
}
