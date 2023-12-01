"use client";

import { EventGetByEventId } from "@/lib/schema";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function GetTicketPage(props: { event: EventGetByEventId, ticket_price: number}) {
	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
			console.log("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
		}
	}, []);

	return (
		<form action="/api/checkout_sessions" method="POST">
			<section>
				<button type="submit" role="link">
					Checkout
				</button>
				<input name="event_name" value={props.event.event_name} type="hidden"></input>
				<input name="ticket_price" value={props.ticket_price} type="hidden"></input>
				<input name="event_id" value={props.event.event_id} type="hidden"></input>

				


			</section>
			<style jsx>
				{`
					section {
						background: #ffffff;
						display: flex;
						flex-direction: column;
						width: 400px;
						height: 112px;
						border-radius: 6px;
						justify-content: space-between;
					}
					button {
						height: 36px;
						background: #556cd6;
						border-radius: 4px;
						color: white;
						border: 0;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.2s ease;
						box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
					}
					button:hover {
						opacity: 0.8;
					}
				`}
			</style>
		</form>
	);
}