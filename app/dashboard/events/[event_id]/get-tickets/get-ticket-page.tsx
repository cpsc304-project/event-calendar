"use client";
import { Account, EventGetByEventId, Ticket } from "@/lib/schema";
import { startTransition, useState, useTransition } from "react";
import { buyTicketForAccountId } from "./actions";
import { redirect } from "next/navigation";

export function GetTicketPage(props: {
	event: EventGetByEventId;
	ticket_info: Ticket | undefined;
	isDiscounted: boolean;
	user: Account;
}) {
	const [disabled, setDisabled] = useState(false);
	const [isPending, startTransition] = useTransition();

	function buyTicket() {
		setDisabled(true);

		startTransition(async () => {
			await buyTicketForAccountId(
				props.user.account_id,
				props.ticket_info!.ticket_id,
				props.event.event_id
			);
			redirect("/dashboard/events/[event_id]/get-tickets/success");
		});
	}

	function BuyTicketButton(props: { account: Account }) {
		return (
			<button
				className="disabled: my-2 w-40 rounded bg-indigo-500 px-3 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-indigo-300"
				disabled={disabled}
				onClick={buyTicket}
			>
				Buy
			</button>
		);
	}

	return (
		<div>
			<h4 className="text-4xl">Get Tickets for {props.event.event_name} </h4>
			<hr className="my-2" />

			<div>
				{!props.ticket_info && (
					<div>
						<div className="inline-flex text-2xl">
							Sorry
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="mx-1 h-8 w-8 self-center text-indigo-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
								/>
							</svg>
						</div>
						<div> There are no tickets available for this event at this time.</div>
					</div>
				)}
				{props.ticket_info && (
					<div className=" flex flex-col">
						<div className="inline-flex gap-3 text-base">
							<div>Ticket Price</div>
							<div className="text-indigo-600">$ {props.ticket_info?.cost / 100} CAD</div>
						</div>
						<BuyTicketButton account={props.user}></BuyTicketButton>
					</div>
				)}
			</div>
		</div>
	);
}
