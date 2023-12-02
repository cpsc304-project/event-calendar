import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import GetTicketPage from "./get-ticket-page";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default async function Page(props: { params: { event_id: string } }) {
	const event_id = parseInt(props.params.event_id);
	const event = await db.events.getByEventId(event_id);
	if (!event) {
		redirect("/dashboard/events");
	}
	return <GetTicketPage event={event} ticket_price={400} />;
}
