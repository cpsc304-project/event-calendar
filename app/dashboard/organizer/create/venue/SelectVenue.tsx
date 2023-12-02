"use client";

import { VenueType, VenueWithArea } from "@/lib/schema";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Button from "@/lib/components/Button";
import CreateVenue from "./CreateVenue";
import { useCreateStore } from "../createStore";
import { useRouter } from "next/navigation";

const venueLabel = (v: VenueWithArea) =>
	`${v.name} [${v.venue_type_name}] - ${v.city}, ${v.province}`;

interface Props {
	venues: VenueWithArea[];
	venueTypes: VenueType[];
	mapboxApikey: string;
}

export default function SelectVenuePage(props: Props) {
	const router = useRouter();

	const [venues, setVenues] = useState(props.venues);
	const [showCreateVenue, setShowCreateVenue] = useState(false);
	const [value, setValue] = useState<VenueWithArea | null>(null);

	const updateVenue = useCreateStore((state) => state.updateVenue);

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		focused,
	} = useAutocomplete({
		options: venues,
		getOptionLabel: venueLabel,
		value,
		onChange: (_event, newValue) => setValue(newValue),
		isOptionEqualToValue: (option, value) => option.venue_id === value.venue_id,
	});

	function onVenueCreate(venue: VenueWithArea) {
		setVenues((venues) => [...venues, venue]);
		setValue(venue);
		setShowCreateVenue(false);
	}

	function onContinue() {
		if (!value) return;
		updateVenue(value);
		router.push("/dashboard/organizer/create/event");
	}

	return (
		<div className="divide-y">
			<section className="pb-8">
				<h1 className="mb-3 text-4xl">Select a Venue</h1>
				<h2 className="text-base font-semibold text-gray-600">
					First thing{"'"}s first, select a venue for your event
				</h2>
			</section>

			<section className="py-8">
				<label {...getInputLabelProps()} className="mb-1 block font-semibold">
					Select a venue
				</label>
				<div {...getRootProps()} className={`relative w-full md:w-1/2 ${focused && "focused"}`}>
					<input
						{...getInputProps()}
						className="w-full rounded-md border bg-gray-50 p-1 shadow-inner"
					/>
					{groupedOptions.length > 0 && (
						<ul
							{...getListboxProps()}
							className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-lg border  bg-white p-2 shadow"
						>
							{(groupedOptions as VenueWithArea[]).map((venue, index) => (
								<li
									{...getOptionProps({ option: venue, index })}
									key={venue.venue_id}
									className="cursor-pointer rounded-md p-2 hover:bg-gray-200 aria-selected:bg-gray-800 aria-selected:text-white"
								>
									{venueLabel(venue)}
								</li>
							))}
						</ul>
					)}
				</div>
				<Button fill className="mt-4" onClick={onContinue}>
					Continue
				</Button>
			</section>

			<section className="space-y-4 pt-8">
				<h3>Don{"'"}t see your venue?</h3>
				<Button className="flex items-center gap-4" onClick={() => setShowCreateVenue((v) => !v)}>
					<p>Create a new venue</p>
					<ChevronUpIcon
						className={`h-4 w-4 rotate-0 transition-transform ${showCreateVenue && "rotate-180"}`}
					/>
				</Button>

				{showCreateVenue && (
					<CreateVenue
						venueTypes={props.venueTypes}
						mapboxApiKey={props.mapboxApikey}
						onCreate={onVenueCreate}
					/>
				)}
			</section>
		</div>
	);
}
