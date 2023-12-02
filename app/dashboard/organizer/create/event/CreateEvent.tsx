"use client";

import { InputArgs, useForm } from "@/lib/form/client";
import { Category, Event } from "@/lib/schema";
import { ReactNode, useCallback, useEffect, useLayoutEffect } from "react";
import { createEventSchema } from "./schema";
import { twMerge } from "tailwind-merge";
import { Action } from "@/lib/form";
import TextField from "@/lib/components/form/TextField";
import TextBox from "@/lib/components/form/TextBox";
import NumberField from "@/lib/components/form/NumberField";
import Submit from "@/lib/components/form/Submit";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import DateField from "@/lib/components/form/DateField";
import Status from "@/lib/components/form/Status";
import { useCreateStore } from "../createStore";
import { useRouter } from "next/navigation";
import Button from "@/lib/components/Button";

function MultiSelect<T>({
	props,
	invalid,
	error,
	choices,
	value,
	label,
	choiceLabel,
}: InputArgs & {
	choices: T[];
	value: (choice: T) => string;
	label: ReactNode;
	choiceLabel: (choice: T) => ReactNode;
}) {
	return (
		<fieldset>
			<legend className="mb-1 block font-semibold">{label}</legend>
			<div className="grid grid-flow-col grid-rows-2 justify-start gap-4">
				{choices.map((choice) => (
					<div key={value(choice)}>
						<label>
							<input {...props} type="checkbox" value={value(choice)} className="peer hidden" />
							{choiceLabel(choice)}
						</label>
					</div>
				))}
			</div>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
		</fieldset>
	);
}

function CategoryChip({ category }: { category: Category }) {
	return (
		<div
			className={twMerge(
				"flex h-36 w-48 flex-shrink-0 flex-col justify-between rounded-xl border p-4 text-start hover:border-gray-800",
				"transform transition-all active:scale-95",
				"peer-checked:border-2 peer-checked:border-gray-800 peer-checked:bg-gray-50",
			)}
		>
			<h4 className="font-semibold">{category.category_name}</h4>
			<p>{category.description}</p>
		</div>
	);
}

interface Props {
	action: Action<Event>;
	categories: Category[];
}

export default function CreateEvent({ action, categories }: Props) {
	const venue = useCreateStore((store) => store.venue);
	const router = useRouter();

	const { Form, Field, submitting, error, invalid, result } = useForm(createEventSchema, action);

	const selectVenue = useCallback(() => {
		router.push("/dashboard/organizer/create/venue");
	}, [router]);

	useEffect(() => {
		if (!venue) {
			selectVenue();
		}
	}, [venue, router, selectVenue]);

	useEffect(() => {
		if (result) {
			router.push(`/dashboard/events/${result.event_id}`);
		}
	}, [result, router]);

	return (
		<div className="space-y-4">
			<div className="mb-4 text-4xl">Create an Event</div>
			<div className="divide-y rounded-lg border">
				<section className="p-8">
					<h3 className="font-semibold">Venue</h3>
					<div className="rounded-lg border p-4">
						<h4 className="text-base font-semibold">{venue?.name}</h4>
						<h5>
							{venue?.street_number} {venue?.street_name}, {venue?.city}, {venue?.province}{" "}
							{venue?.postal_code}
						</h5>
					</div>
					<Button onClick={selectVenue} className="mt-4">
						Choose a different venue
					</Button>
				</section>
				<Form className="divide-y">
					<section className="p-8">
						<Status error={error} invalid={invalid} />
						<Field for="name">{(args) => <TextField args={args}>Event name</TextField>}</Field>
						<Field for="description">
							{(args) => <TextBox args={args}> Event description</TextBox>}
						</Field>
						<Field for="attendees">
							{(args) => <NumberField args={args}>Number of attendees</NumberField>}
						</Field>
						<Field for="start_date">
							{(args) => <DateField args={args}>Start date</DateField>}
						</Field>
						<Field for="end_date">{(args) => <DateField args={args}>End date</DateField>}</Field>
					</section>
					<section className="p-8">
						<Field for="category_names">
							{(args) => (
								<MultiSelect
									{...args}
									choices={categories}
									value={(c) => c.category_name}
									label="Event categories"
									choiceLabel={(category) => <CategoryChip category={category} />}
								/>
							)}
						</Field>
					</section>
					<Field for="venue_id">
						{(args) => <input {...args.props} type="hidden" value={venue?.venue_id} />}
					</Field>
					<section className="flex items-center gap-8 bg-gray-50 p-8">
						<Submit />
						{submitting && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
					</section>
				</Form>
			</div>
		</div>
	);
}
