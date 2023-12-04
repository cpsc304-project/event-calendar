"use client";
import { Account, EventGetByEventId, Ticket } from "@/lib/schema";
import { useState, useTransition } from "react";
import { buyTicketForAccountId } from "./actions";
import { redirect } from "next/navigation";

export function GetTicketPage(props: {
	event: EventGetByEventId;
	ticket_info: Ticket | undefined;
	isDiscounted: boolean;
	user: Account;
	numberAvailable: number;
}) {
	const [disabled, setDisabled] = useState(false);
	let ticketPriceCents = 0;
	if (props.ticket_info) {
		ticketPriceCents = parseInt(props.ticket_info?.cost);
		console.log(ticketPriceCents);
		if (props.isDiscounted) {
			ticketPriceCents =
				(parseInt(props.ticket_info?.cost) * (100 - parseInt(props.ticket_info?.discount!))) / 100;
		}
	}

	function buyTicket() {
		setDisabled(true);
		buyTicketForAccountId(
			props.user.account_id,
			props.ticket_info!.ticket_id,
			props.event.event_id,
		);
	}

	function BuyTicketButton(props: { account: Account }) {
		return (
			<button
				className="disabled: my-2 w-40 rounded bg-indigo-500 px-3 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-indigo-300"
				disabled={disabled}
				onClick={buyTicket}
			>
				{disabled && (
					<div className="inline-flex">
						<svg
							className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Pending...
					</div>
				)}
				{!disabled && <div>Buy</div>}
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
						<div className="my-2 text-lg">
							There are {props.numberAvailable} tickets available for purchase
						</div>
						{props.isDiscounted && (
							<div>
								<div className="mb-2 w-fit rounded border bg-indigo-200 px-5 py-3">
									<h3 className="text-base">
										Hooray! There is a discounted ticket with promo code: [
										{props.ticket_info.promo_code}]
									</h3>
								</div>
								<div className="text-sm">Promo codes are automatically applied</div>
								<div className="inline-flex gap-3 text-base">
									<div>Ticket Price:</div>
									<div className="text-red-600 line-through">
										$ {parseInt(props.ticket_info?.cost) / 100} CAD
									</div>
									<div className="text-indigo-600">
										{(Math.round(ticketPriceCents) / 100).toFixed(2)} CAD
									</div>
								</div>
							</div>
						)}
						{!props.isDiscounted && (
							<div className="inline-flex gap-3 text-base">
								<div>Ticket Price:</div>
								<div className="text-indigo-600">
									$ {parseInt(props.ticket_info?.cost) / 100} CAD
								</div>
							</div>
						)}

						<BuyTicketButton account={props.user}></BuyTicketButton>
					</div>
				)}
			</div>
		</div>
	);
}
