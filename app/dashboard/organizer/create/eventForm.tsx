"use client";

import { InputArgs, useForm } from "@/lib/form/client";
import { Category } from "@/lib/schema";
import { PropsWithChildren, ReactNode } from "react";
import { createEventSchema } from "./schema";
import { twMerge } from "tailwind-merge";
import { Action } from "@/lib/form";

function TextField({ props, invalid, error, children }: PropsWithChildren<InputArgs>) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<input
				{...props}
				type="text"
				className="w-full rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
		</div>
	);
}

function Textbox({ props, invalid, error, children }: PropsWithChildren<InputArgs>) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<textarea
				{...props}
				className="h-24 w-full resize-none rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
		</div>
	);
}

function NumberField({ props, invalid, error, children }: PropsWithChildren<InputArgs>) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<input
				{...props}
				type="number"
				className="w-full rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
		</div>
	);
}

function DatePicker({ props, invalid, error, children }: PropsWithChildren<InputArgs>) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<input
				{...props}
				type="date"
				className="w-full rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
		</div>
	);
}

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

function SubmitButton({ disabled }: { disabled?: boolean }) {
	return (
		<button
			type="submit"
			disabled={disabled}
			className="rounded-md bg-slate-800 px-4 py-2 text-white"
		>
			Submit
		</button>
	);
}

interface Props {
	action: Action<void>;
	categories: Category[];
}

export default function EventForm(props: Props) {
	const { Form, Field, submitting, error, invalid } = useForm(createEventSchema, props.action);

	return (
		<div>
			<div className="mb-4 text-4xl">Create an Event</div>
			<Form className="space-y-4">
				{submitting && <p>Submitting...</p>}
				{error && <p>{error}</p>}
				{invalid && <p>{invalid}</p>}
				<Field for="name">{(args) => <TextField {...args}>Event name</TextField>}</Field>
				<Field for="description">{(args) => <Textbox {...args}> Event description</Textbox>}</Field>
				<Field for="attendees">
					{(args) => <NumberField {...args}>Number of attendees</NumberField>}
				</Field>
				<Field for="start_date">{(args) => <DatePicker {...args}>Start date</DatePicker>}</Field>
				<Field for="end_date">{(args) => <DatePicker {...args}>End date</DatePicker>}</Field>
				<Field for="categories">
					{(args) => (
						<MultiSelect
							{...args}
							choices={props.categories}
							value={(c) => c.category_name}
							label="Event categories"
							choiceLabel={(category) => <CategoryChip category={category} />}
						/>
					)}
				</Field>
				<SubmitButton />
			</Form>
		</div>
	);
}
