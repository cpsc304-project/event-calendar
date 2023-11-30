"use client";

import { Account, Category } from "@/lib/schema";
import { useState } from "react";

export default function CreateEventPage(props: {
	user: Account;
	organizerName: string;
	eventCategories: Category[];
}) {
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

	return (
		<>
			<div className="flex flex-col">
				<div className="mb-3 text-4xl">Create an Event</div>
				<hr className="mb-3" />
				{/* Event Info */}
				<div className="container">
					<div className="my-1">
						<div className="text-2xl">Event Info</div>
						<div className="mb-2 grid grid-cols-10 gap-2">
							<div className="col-span-4">
								<div className="py-auto group relative text-base ">
									<div className="py-1.5">Organizer Name</div>
								</div>
							</div>
							<div className="col-span-6">
								<div className="py-1.5 text-base text-stone-700">{props.organizerName}</div>
							</div>
							<div className="col-span-4">
								<div className="py-auto group relative text-base ">
									{/* TODO: limit event name to certain length */}
									<div className="py-1.5">Event Name</div>
								</div>
							</div>
							<div className="col-span-6">
								<input
									type="text"
									name="eventName"
									id="eventName"
									placeholder="Name your event"
									className="block w-full rounded-md border-2 py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
								></input>
							</div>
							<div className="col-span-4">
								<div className="py-auto group relative text-base ">
									<div className="py-1.5">Event Description</div>
								</div>
							</div>
							<div className="col-span-6">
								<input
									type="text"
									name="eventDescription"
									id="eventDescription"
									placeholder="Describe your event"
									className="block w-full rounded-md border-2 py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
								></input>
							</div>
							<div className="col-span-4">
								<div className="py-auto group relative text-base ">
									<div className="py-1.5">Number of Attendees</div>
								</div>
							</div>
							<div className="col-span-6">
								<input
									type="number"
									name="ticketCount"
									id="ticketCount"
									placeholder="0"
									className="block w-full rounded-md border-2 py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
								></input>
							</div>
							{/* TODO:	ADD DATEPICKER  for Start and End date*/}
						</div>
						<div className="my-4 mb-2  text-2xl">Event Category</div>
						<div className="text-base">Select the category your event best fits</div>
						<div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
							{" "}
							{props.eventCategories.map((category) => generateCategory(category))}
						</div> 
						{/* TODO make call for all venues... ? and also allow for creation of new venue */}
						<div className="my-4 mb-2  text-2xl">Select Venue</div>
						<div className="text-base">Select the venue your event will take place at</div>
						
					</div>
					<hr className="my-2" />
				</div>
				{/* Event Info End */}
			</div>
		</>
	);
}

// TODO: create venue needs to be its own part of page, maybe modal????? or just a new page that then redirects to create event page
function CreateVenue() {
	return <></>;
}

//TODO you can figure htis one out..
function generateCategory(category: Category) {
	console.log(category);
	return (
		<button className="btn h-full w-full rounded-md border bg-indigo-50 p-4 lg:p-5">
			<h4 className="font-bold">{category.category_name}</h4>
			<p>{category.description}</p>
		</button>
	);
}
