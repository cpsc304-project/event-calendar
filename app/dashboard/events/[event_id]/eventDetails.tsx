"use client";
import { useState } from "react";
import { ReviewsCard } from "@/lib/components/review-card";
import "tailwindcss/tailwind.css";

import {
	EventGetByEventId,
	GetCategoriesByEventIdReturn,
	ReviewGetAllByEventId,
} from "@/lib/schema";

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
		<div className="rounded bg-blue-50">
			<div className="mb-3 text-4xl">
				<h1 className="font-bold leading-relaxed">{props.event.event_name}</h1>
			</div>

			<div className="mb-2 text-2xl">
				<ul>
					{props.categories.map((category) => (
						<li key={category.event_id}>
							<h2>{category.category_name}</h2>
						</li>
					))}
				</ul>
			</div>

			<div className="p-4">
				<h3 className="mb-2 text-center text-2xl font-bold leading-relaxed">
					{props.event.event_name} Details
				</h3>
			</div>

			<div className="mb-2 text-lg">
				<h2>
					<strong>Event Overview</strong>{" "}
				</h2>
				<p>
					Join us for an unforgettable experience at {props.event.event_name}. This exciting event
					is set to take place from the
					<span className="ml-2">{formatDate(props.event.start_date)}</span> to the
					<span className="ml-2">{formatDate(props.event.end_date)}</span>
				</p>
				<div className="p-6">
					<strong>The Location</strong>
					<p>
						{props.event.venue_name}, located at {props.event.venue_street_number}{" "}
						{props.event.venue_street_name}, {props.event.venue_country}{" "}
						{props.event.venue_postal_code}
					</p>
				</div>
				<div className = "p-4 text-lg">
						<strong>Start Date:</strong>{" "}
						<p>
						<span className="ml-2">{formatDate(props.event.start_date)}</span>
					</p>
						<strong>End Date:</strong>{" "}
						<p>
						<span className="ml-2">{formatDate(props.event.end_date)}</span>
					</p>
				</div>
				<div className="p-3">
					<strong>Tickets Available</strong>
					<p>
						<button className="rounded bg-blue-300 px-4 py-2 text-white m-2">Get Tickets</button>
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
