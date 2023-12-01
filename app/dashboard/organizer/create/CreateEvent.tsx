"use client";

import { InputArgs, useForm } from "@/lib/form/client";
import { Category } from "@/lib/schema";
import { ReactNode } from "react";
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
	action: Action<void>;
	categories: Category[];
}

export default function CreateEvent({ action, categories }: Props) {
	const { Form, Field, submitting, error, invalid } = useForm(createEventSchema, action);

	return (
		<div>
			<div className="mb-4 text-4xl">Create an Event</div>
			<Form className="space-y-4">
				<Status error={error} invalid={invalid} />
				<Field for="name">{(args) => <TextField args={args}>Event name</TextField>}</Field>
				<Field for="description">
					{(args) => <TextBox args={args}> Event description</TextBox>}
				</Field>
				<Field for="attendees">
					{(args) => <NumberField args={args}>Number of attendees</NumberField>}
				</Field>
				<Field for="start_date">{(args) => <DateField args={args}>Start date</DateField>}</Field>
				<Field for="end_date">{(args) => <DateField args={args}>End date</DateField>}</Field>
				<Field for="categories">
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
				<span className="flex items-center gap-8">
					<Submit />
					{submitting && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
				</span>
			</Form>
		</div>
	);
}
