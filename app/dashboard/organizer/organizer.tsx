"use client";

import { Account, EventGetByOrganizerId } from "@/lib/schema";
import { useState, useTransition } from "react";
import { insertOrganizer } from "./actions";
import { EventCard } from "@/lib/components/event-card";
import Link from "next/link";

const createLink = "/dashboard/organizer/create";

// TODO: remove after testing..
const mockEvents: EventGetByOrganizerId[] = [
	{
		event_id: 1,
		event_name: "Hozier Concert",
		event_description: "A night of folk music",
		start_date: new Date("2023-11-15T08:00:00.000Z"),
		end_date: new Date("2023-11-16T08:00:00.000Z"),
		venue_name: "Grand Arena",
		venue_description: "Large concert hall",
		venue_seats: 5000,
		venue_street_number: 123,
		venue_street_name: "Main Street",
		venue_country: "Canada",
		venue_postal_code: "V6T1Z4",
		venue_type_name: "Concert Hall",
		venue_type_description: "Large indoor venue for music concerts",
		category_name: "Music",
		category_description: "Events related to music and concerts",
	},
	{
		event_id: 4,
		event_name: "Soccer Game",
		event_description: "We hate tottenham",
		start_date: new Date("2023-12-15T08:00:00.000Z"),
		end_date: new Date("2023-12-16T08:00:00.000Z"),
		venue_name: "Grand Arena",
		venue_description: "Big Football Stadium",
		venue_seats: 5000,
		venue_street_number: 123,
		venue_street_name: "Other Street",
		venue_country: "Canada",
		venue_postal_code: "V6T1Z4",
		venue_type_name: "Sports Stadium",
		venue_type_description: "Big Football Stadium Yeah",
		category_name: "Music",
		category_description: "Events related to music and concerts",
	},
	{
		event_id: 72,
		event_name: "Other Concert",
		event_description: "A night of other music",
		start_date: new Date("2023-11-15T08:00:00.000Z"),
		end_date: new Date("2023-11-16T08:00:00.000Z"),
		venue_name: "Grand Arena",
		venue_description: "Large concert hall",
		venue_seats: 5000,
		venue_street_number: 123,
		venue_street_name: "Main Street",
		venue_country: "Canada",
		venue_postal_code: "V6T1Z4",
		venue_type_name: "Concert Hall",
		venue_type_description: "Large indoor venue for music concerts",
		category_name: "Music",
		category_description: "Events related to music and concerts",
	},
	{
		event_id: 72,
		event_name: "Other Concert",
		event_description: "A night of other music",
		start_date: new Date("2023-11-15T08:00:00.000Z"),
		end_date: new Date("2023-11-16T08:00:00.000Z"),
		venue_name: "Grand Arena",
		venue_description: "Large concert hall",
		venue_seats: 5000,
		venue_street_number: 123,
		venue_street_name: "Main Street",
		venue_country: "Canada",
		venue_postal_code: "V6T1Z4",
		venue_type_name: "Concert Hall",
		venue_type_description: "Large indoor venue for music concerts",
		category_name: "Music",
		category_description: "Events related to music and concerts",
	},
	{
		event_id: 72,
		event_name: "Other Concert",
		event_description: "A night of other music",
		start_date: new Date("2023-11-15T08:00:00.000Z"),
		end_date: new Date("2023-11-16T08:00:00.000Z"),
		venue_name: "Grand Arena",
		venue_description: "Large concert hall",
		venue_seats: 5000,
		venue_street_number: 123,
		venue_street_name: "Main Street",
		venue_country: "Canada",
		venue_postal_code: "V6T1Z4",
		venue_type_name: "Concert Hall",
		venue_type_description: "Large indoor venue for music concerts",
		category_name: "Music",
		category_description: "Events related to music and concerts",
	},
];

export default function Organizer(props: {
	user: Account;
	organizerName: string | undefined;
	events: EventGetByOrganizerId[];
}) {
	const eventsArray = [...props.events];

	const [name, setName] = useState(props.organizerName);
	const [isPending, startTransition] = useTransition();

	// MIGHT NOT UPDATE NAME IMMEDIATELY AFTER INSERTING CHECK DURING BUILD
	function handleNameChange() {
		if (!name) return;
		startTransition(async () => {
			await insertOrganizer(props.user.account_id, name);
			setName(name);
		});
	}

	return (
		<>
			{/* Organizer Dashboard Container Start */}
			<div className="flex flex-col">
				<div className="mb-3 text-4xl">Organizer Dashboard</div>
				<hr className="mb-3" />
				{/* Dashboard Content */}
				<div className=" gap-3">
					<div className="container">
						<div className="my-1">
							<div className="text-2xl">Personal Info</div>
							<div className="mb-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
								<div className="col-span-4">
									<div className="py-auto group relative text-base ">
										<div className="py-1.5">
											Organizer Name
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="relative -top-0.5 inline-flex h-4 w-4 self-center"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
												/>
											</svg>
										</div>
										<div className="pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 ">
											<div className="rounded bg-indigo-50 px-2 py-1">
												This is the name that will
												<br />
												be displayed on your events{" "}
											</div>
										</div>
									</div>
								</div>
								<div className="col-span-5">
									<div>
										<input
											type="text"
											name="name"
											id="name"
											className="block w-full rounded-md border-2 py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
											onChange={(e) => setName(e.target.value)}
											value={name}
										></input>
									</div>
								</div>
								<div className="col-span-1">
									<button
										className="sm:py-auto h-full rounded bg-indigo-500 p-3 px-3 font-bold text-white hover:bg-blue-700"
										onClick={handleNameChange}
									>
										Confirm
									</button>
								</div>
							</div>
						</div>
						<hr className="my-2" />
					</div>

					<div>
						<div className="my-1 flex flex-col">
							{/* TODO: potentially allow sorting of events.. */}
							<div className="mb-2 text-2xl">Your Events</div>
							{eventsArray.length ? null : (
								<div className="flex flex-row">
									<div className="py-1.5">
										You have no events yet. Create your first event below!
									</div>
									<div className="p-1.5"></div>
								</div>
							)}
							<div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:gap-4">
								<EventCard createLink={createLink} />
								{eventsArray.map((event) => (
									<EventCard key={event.event_id} event={event} />
								))}
								{}
							</div>
						</div>
						<hr className="my-2" />
					</div>
				</div>
			</div>
			{/* Organizer Dashboard Container End */}
		</>
	);
}
