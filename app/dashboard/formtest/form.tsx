"use client";

import { InputArgs, useForm } from "@/lib/form/client";
import { personForm } from "./schema";
import { action } from "./action";
import { PropsWithChildren } from "react";

function TextField({ props, invalid, error, children }: PropsWithChildren<InputArgs>) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<input
				{...props}
				type="text"
				className="mb-4 w-full rounded-md border bg-gray-50 p-1 shadow-inner"
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
				className="mb-4 w-full rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
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

export default function Form() {
	const { Form, Field, submitting, error, invalid } = useForm(personForm, action);

	return (
		<Form>
			{submitting && <p>Submitting...</p>}
			{error && <p>{error}</p>}
			{invalid && <p>{invalid}</p>}
			<Field for="name">{(args) => <TextField {...args}>Name</TextField>}</Field>
			<Field for="age">{(args) => <NumberField {...args}>Age</NumberField>}</Field>
			<SubmitButton disabled={submitting} />
		</Form>
	);
}
