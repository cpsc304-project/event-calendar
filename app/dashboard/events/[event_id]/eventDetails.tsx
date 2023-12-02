"use client";
import { useState } from "react";
import { ReviewsCard } from "@/lib/components/review-card";

import {
	EventGetByEventId,
	GetCategoriesByEventIdReturn,
	ReviewGetAllByEventId,
} from "@/lib/schema";
import Link from "next/link";

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
}) {
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
					<strong>Tickets Available</strong>
					<p>
						<Link href={`/dashboard/events/${props.event.event_id}/get-tickets`} passHref>
							<button className="m-2 rounded bg-indigo-500 px-4 py-2 text-white">
								Get Tickets
							</button>
						</Link>
					</p>
				</div>
			</div>
			<div className="p-4">
				<h3 className="mt-3 text-2xl font-bold leading-relaxed">Reviews</h3>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{props.reviews.map((review) => (
						<ReviewsCard key={review.review_id} review={review} />
					))}
				</div>
			</div>
		</div>
	);
}
