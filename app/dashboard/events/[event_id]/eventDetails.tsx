"use client";
import { useState } from "react";
import { ReviewsCard } from "@/lib/components/review-card";

import {
	EventGetByEventId,
	GetCategoriesByEventIdReturn,
	Review,
	ReviewGetAllByEventId,
} from "@/lib/schema";
import Link from "next/link";
import { useForm } from "@/lib/form/client";
import { createReviewSchema } from "./schema";
import NumberField from "@/lib/components/form/NumberField";
import Submit from "@/lib/components/form/Submit";
import { Action } from "@/lib/form";
import TextBox from "@/lib/components/form/TextBox";
import Status from "@/lib/components/form/Status";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function formatDate(date: Date | string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return new Intl.DateTimeFormat("en-UK", options).format(new Date(date));
}

export function EventDetails(props: {
	event: EventGetByEventId;
	reviews: ReviewGetAllByEventId[];
	categories: GetCategoriesByEventIdReturn[];
	action: Action<Review>;
}) {
	const { Form, Field, error, invalid, submitting, result } = useForm(
		createReviewSchema,
		props.action,
	);

	return (
		<div className="rounded bg-indigo-50 p-4">
			<div className="mb-3 text-4xl">
				<h1 className="font-bold leading-relaxed">{props.event.event_name}</h1>
				<div className="mb-2 text-2xl text-stone-600">
					<ul>
						{props.categories.map((category) => (
							<li key={category.event_id}>
								<h2>{category.category_name}</h2>
							</li>
						))}
					</ul>
				</div>
			</div>
			<hr className="my-2 h-2" />

			<h3 className="mb-2 text-2xl leading-relaxed">Event Details</h3>

			<div className="mb-2 text-lg">
				<div className="mb-2">
					<h2>
						<strong>Event Description</strong>{" "}
					</h2>
					<p>{props.event.event_description}</p>
				</div>
				<div className="mb-2">
					<strong>Location</strong>
					<p>
						{props.event.venue_name}, located at {props.event.venue_street_number}{" "}
						{props.event.venue_street_name}, {props.event.venue_country}{" "}
						{props.event.venue_postal_code}
					</p>
				</div>
				<div className="mb-2">
					<strong>Start Date:</strong>{" "}
					<p>
						<span className="ml-2">{formatDate(props.event.start_date)}</span>
					</p>
					<strong>End Date:</strong>{" "}
					<p>
						<span className="ml-2">{formatDate(props.event.end_date)}</span>
					</p>
				</div>

				<div className="mb-2">
					<strong>Tickets</strong>
					<p>
						<Link href={`/dashboard/events/${props.event.event_id}/get-tickets`} passHref>
							<button className="m-2 rounded bg-indigo-500 px-4 py-2 text-white">
								Get Tickets
							</button>
						</Link>
					</p>
				</div>
			</div>
			<hr className="my-2" />
			<div className="">
				<h3 className="mt-3 text-2xl font-bold leading-relaxed">Reviews</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					{props.reviews.map((review) => (
						<ReviewsCard key={review.review_id} review={review} />
					))}
				</div>
				<p className="my-2 text-base">Add your own review (must be a ticket holder):</p>
				<Form>
					<Status error={error} invalid={invalid}></Status>
					<Field for="rating">
						{(args) => (
							<NumberField args={args} min={1} max={5}>
								Rating
							</NumberField>
						)}
					</Field>
					<Field for="reviewText">
						{(args) => (
							<TextBox args={args} minLength={1}>
								Review
							</TextBox>
						)}
					</Field>
					<Submit>Submit</Submit>
					{submitting && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
				</Form>
			</div>
		</div>
	);
}
