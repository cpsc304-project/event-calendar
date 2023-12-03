"use client";

import { InputArgs, useForm } from "@/lib/form/client";
import {
	Category,
	DiscountedTicket,
	Event,
	EventWithVenueAndAreaAndCategories,
	Ticket,
} from "@/lib/schema";
import { ReactNode, useEffect } from "react";
import { createDiscountSchema, editEventSchema } from "./schema";
import { twMerge } from "tailwind-merge";
import { Action } from "@/lib/form";
import TextField from "@/lib/components/form/TextField";
import TextBox from "@/lib/components/form/TextBox";
import NumberField from "@/lib/components/form/NumberField";
import Submit from "@/lib/components/form/Submit";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import DateField from "@/lib/components/form/DateField";
import Status from "@/lib/components/form/Status";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const toFormDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

function MultiSelect<T>({
	props,
	invalid,
	error,
	choices,
	defaultChoices,
	value,
	label,
	choiceLabel,
}: InputArgs & {
	choices: T[];
	defaultChoices: T[];
	value: (choice: T) => string;
	label: ReactNode;
	choiceLabel: (choice: T) => ReactNode;
}) {
	return (
		<fieldset>
			<legend className="mb-1 block font-semibold">{label}</legend>
			<div className="flex flex-col flex-wrap gap-4 md:flex-row">
				{choices.map((choice) => (
					<div key={value(choice)}>
						<label>
							<input
								{...props}
								type="checkbox"
								value={value(choice)}
								className="peer hidden"
								defaultChecked={defaultChoices.some((c) => value(c) === value(choice))}
							/>
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
				"flex h-24 w-full flex-shrink-0 flex-col justify-between rounded-xl border p-4 text-start hover:border-gray-800 md:h-36 md:w-48",
				"transform transition-transform active:scale-95",
				"peer-checked:border-2 peer-checked:border-gray-800 peer-checked:bg-gray-50",
			)}
		>
			<h4 className="font-semibold">{category.category_name}</h4>
			<p>{category.description}</p>
		</div>
	);
}

interface Props {
	event: EventWithVenueAndAreaAndCategories;
	categories: Category[];
	action: Action<Event>;
	createDiscountsAction: Action<DiscountedTicket[]>;
	ticketsAvailable: number;
}

export default function EditEvent({
	event,
	categories,
	action,
	createDiscountsAction,
	ticketsAvailable

}: Props) {
	const router = useRouter();
	const { Form, Field, submitting, error, invalid, result } = useForm(editEventSchema, action);
	const createDiscountForm = useForm(createDiscountSchema, createDiscountsAction);

	useEffect(() => {
		if (result) {
			router.push("/dashboard/organizer");
		}
	}, [result, router]);

	return (
		<div className="space-y-4">
			<div className="mb-4 text-4xl">Edit Your Event</div>
			<div className="divide-y rounded-lg border">
				<section className="flex flex-col items-start gap-4 px-4 py-8 md:px-8">
					<h3 className="font-semibold">Venue</h3>
					<div className="rounded-lg border p-4">
						<h4 className="text-base font-semibold">{event.venue.name}</h4>
						<h5>
							{event.venue.street_number} {event.venue.street_name}, {event.venue.city},{" "}
							{event.venue.province} {event.venue.postal_code}
						</h5>
					</div>
				</section>
				<Form className="divide-y">
					<section className="flex flex-col gap-4 px-4 py-8 md:px-8">
						<Status error={error} invalid={invalid} />
						<Field for="event_id">
							{(args) => <input {...args.props} type="hidden" value={event.event_id} />}
						</Field>
						<Field for="name">
							{(args) => (
								<TextField args={args} defaultValue={event.name} className="md:w-1/2">
									Name
								</TextField>
							)}
						</Field>
						<Field for="description">
							{(args) => (
								<TextBox args={args} defaultValue={event.description}>
									Description
								</TextBox>
							)}
						</Field>
						<span className="grid gap-4 md:grid-cols-3">
							<Field for="ticket_count">
								{(args) => (
									<NumberField args={args} defaultValue={event.ticket_count.toString()}>
										Number of tickets
									</NumberField>
								)}
							</Field>
							<Field for="ticket_cost">
								{(args) => (
									<NumberField args={args} step={0.01}>
										Ticket price
									</NumberField>
								)}
							</Field>
						</span>
						<Field for="start_date">
							{(args) => (
								<DateField
									args={args}
									defaultValue={toFormDateString(event.start_date)}
									className="md:w-1/4"
								>
									Start date
								</DateField>
							)}
						</Field>
						<Field for="end_date">
							{(args) => (
								<DateField
									args={args}
									defaultValue={toFormDateString(event.end_date)}
									className="md:w-1/4"
								>
									End date
								</DateField>
							)}
						</Field>
					</section>
					<section className="px-4 py-8 md:px-8">
						<Field for="category_names">
							{(args) => (
								<MultiSelect
									{...args}
									choices={categories}
									defaultChoices={event.categories}
									value={(c) => c.category_name}
									label="Categories"
									choiceLabel={(category) => <CategoryChip category={category} />}
								/>
							)}
						</Field>
					</section>
					<section className="rounded bg-gray-50 py-4">
						<Submit className="mx-4 my-4 md:mx-8">Save</Submit>
						{submitting && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
					</section>
				</Form>
			</div>

			<hr className="my-4" />
			<div className="mb-4 mt-3 md:mt-5 text-3xl">Generate discounted tickets</div>

			<div className="rounded border">
				<div className=" bold mt-3 px-4 text-base md:px-8">
					You have {ticketsAvailable} tickets out of {event.ticket_count} available to add discounts
					to
				</div>

				<createDiscountForm.Form className="divide-y">
					<section className="flex flex-col gap-4 px-4 py-8 md:px-8">
						<createDiscountForm.Field for="amountToDiscount">
							{(args) => (
								<NumberField args={args} min={1} max={ticketsAvailable} placeholder="1">
									Number of tickets to discount
								</NumberField>
							)}
						</createDiscountForm.Field>
						<createDiscountForm.Field for="discount">
							{(args) => (
								<NumberField args={args} min={1} max={ticketsAvailable} placeholder="0-100">
									Discount to apply (in percent)
								</NumberField>
							)}
						</createDiscountForm.Field>
						<createDiscountForm.Field for="promo_code">
							{(args) => (
								<TextField args={args} placeholder="THANKYOU10">
									Promo code
								</TextField>
							)}
						</createDiscountForm.Field>
					</section>
					<section className="rounded bg-gray-50 py-4">
						<Submit className="mx-4 my-4 md:mx-8">Generate</Submit>
					</section>
				</createDiscountForm.Form>
			</div>
		</div>
	);
}
