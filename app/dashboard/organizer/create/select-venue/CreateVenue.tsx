"use client";

import { useForm } from "@/lib/form/client";
import { createVenueSchema } from "./schema";
import { createVenueAction } from "./action";
import TextField from "@/lib/components/form/TextField";
import Submit from "@/lib/components/form/Submit";
import TextBox from "@/lib/components/form/TextBox";
import NumberField from "@/lib/components/form/NumberField";
import Select from "@/lib/components/form/Select";
import { VenueType, VenueWithArea } from "@/lib/schema";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
	ArrowPathIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Status from "@/lib/components/form/Status";

const AddressAutofill = dynamic(() => import("./mapbox").then((mod) => mod.AddressAutofill), {
	ssr: false,
	loading: () => (
		<TextField
			args={{ props: { id: "street_address", name: "street_address" }, submitting: false }}
			autoComplete="street-address"
		>
			Street address
		</TextField>
	),
});

interface Props {
	venueTypes: VenueType[];
	mapboxApiKey: string;
	onCreate?: (venue: VenueWithArea) => void;
}

export default function CreateVenue({ venueTypes, mapboxApiKey, onCreate }: Props) {
	const { Form, Field, error, invalid, submitting, result } = useForm(
		createVenueSchema,
		createVenueAction,
	);

	useEffect(() => {
		if (result) {
			onCreate?.(result);
		}
	}, [result, onCreate]);

	return (
		<div className="rounded-lg border">
			<Form className="divide-y">
				<section className="flex flex-col gap-4 px-4 py-8 md:px-8">
					<Status error={error} invalid={invalid} />
					<Field for="name">
						{(args) => (
							<TextField args={args} className="md:w-1/2">
								Name
							</TextField>
						)}
					</Field>
					<Field for="description">{(args) => <TextBox args={args}>Description</TextBox>}</Field>
					<Field for="seats">
						{(args) => (
							<NumberField args={args} className="md:w-1/4">
								Capacity
							</NumberField>
						)}
					</Field>
					<Field for="venue_type_name">
						{(args) => (
							<Select
								args={args}
								options={venueTypes}
								label={"Venue type"}
								getName={(venueType) => venueType.venue_type_name}
								className="md:w-1/2"
							/>
						)}
					</Field>
				</section>
				<section className="flex flex-col gap-4 px-4 py-8 md:px-8">
					<Field for="street_address">
						{(args) => (
							<AddressAutofill accessToken={mapboxApiKey}>
								<TextField args={args} autoComplete="street-address">
									Street address
								</TextField>
							</AddressAutofill>
						)}
					</Field>
					<span className="grid gap-4 md:grid-cols-3">
						<Field for="city">
							{(args) => (
								<TextField args={args} autoComplete="address-level2">
									City
								</TextField>
							)}
						</Field>
						<Field for="province">
							{(args) => (
								<TextField args={args} autoComplete="address-level1">
									Province
								</TextField>
							)}
						</Field>
						<Field for="postal_code">
							{(args) => (
								<TextField args={args} autoComplete="postal-code">
									Postal code
								</TextField>
							)}
						</Field>
					</span>
					<Field for="country">
						{(args) => (
							<TextField args={args} autoComplete="country-name" className="md:w-1/2">
								Country
							</TextField>
						)}
					</Field>
				</section>
				<section className="flex items-center gap-8 bg-gray-50 px-4 py-8 md:px-8">
					<Submit className="self-start">Create</Submit>
					{submitting && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
				</section>
			</Form>
		</div>
	);
}
