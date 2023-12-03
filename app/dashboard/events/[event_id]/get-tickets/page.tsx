import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { GetTicketPage } from "./get-ticket-page";
import { EventGetByEventId, Ticket } from "@/lib/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Page(props: { params: { event_id: string } }) {
	// const mockEvent: EventGetByEventId = {
	// 	event_id: 1,
	// 	event_name: "mock event",
	// 	event_description: "mock description",
	// 	start_date: new Date(),
	// 	end_date: new Date(),
	// 	venue_name: "mock venue",
	// 	venue_street_number: 20,
	// 	venue_street_name: "mock street name",
	// 	venue_country: "mock country",
	// 	venue_postal_code: "mock postal code",
	// 	venue_description: "mock venue description",
	// 	venue_seats: 100,
	// 	venue_type_name: "mock venue type name",
	// 	venue_type_description: "mock venue type description",
	// 	category_name: "mock category name",
	// 	category_description: "mock category description",
	// 	venue_city: "mock city",
	// 	venue_province: "mock province",
	// 	organizer_name: "mock organizer name",
	// 	organizer_id: 1,
	// };

	// const mockDiscountedTicket: Ticket = {
	// 	ticket_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
	// 	account_id: 1,
	// 	event_id: 1,
	// 	cost: 400,
	// 	discount: 0,
	// 	promo_code: "MOCKPROMO",
	// };

	// const regularTicket: Ticket = {
	// 	ticket_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
	// 	account_id: 1,
	// 	event_id: 1,
	// 	cost: 400,
	// };

	// event_id: number;
	// event_name: string;
	// event_description: string;
	// start_date: Date;
	// end_date: Date;
	// venue_name: string;
	// venue_description: string;
	// venue_seats: number;
	// venue_street_number: number;
	// venue_street_name: string;
	// venue_country: string;
	// venue_postal_code: string;
	// venue_type_name: string;
	// venue_type_description: string;
	// category_name: string;
	// category_description: string;
	// venue_city: string;
	// venue_province: string;
	// organizer_name: string;
	// organizer_id: number;

	const event_id = parseInt(props.params.event_id);
	const ticket = await db.tickets.getAvailableOne(event_id);
	const availableTickets = await db.tickets.getNumberAvailable(event_id);
	const discountedTicket = await db.tickets.getAvailableDiscountedOne(event_id);
	const event = await db.events.getByEventId(event_id);
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();

	if (!kindeUser) {
		return (
			<div className="mx-auto my-auto">
				<LoginLink className="rounded bg-indigo-500 px-5 py-3 text-white">
					Sign in to buy tickets
				</LoginLink>
			</div>
		);
	}
	const user = await db.accounts.getByKindeId(kindeUser.id);

	if (!event) {
		redirect("/dashboard/events");
	}

	if (discountedTicket) {
		return <GetTicketPage event={event} ticket_info={discountedTicket} isDiscounted={true} user={user} numberAvailable={availableTickets}/>;
	} else {
		return <GetTicketPage event={event} ticket_info={ticket} isDiscounted={false} user={user} numberAvailable={availableTickets}/>;
	}

}
