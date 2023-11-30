"use client";

import type { Category, Event } from "@/lib/schema";
import { useState, useTransition, useLayoutEffect, useCallback, useRef, useEffect } from "react";
import { getEvents } from "./actions";
import { RESULTS_PER_QUERY } from "@/lib/constants";
import Link from "next/link";
import FiltersModal from "./FiltersModal";
import Button from "@/lib/components/Button";
import { temporaryStorage } from "./storage";

function useSessionStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState(() => {
		const storedValue = temporaryStorage.get(key);
		if (storedValue) {
			return JSON.parse(storedValue) as T;
		} else {
			return initialValue;
		}
	});

	const setAndStoreValue = useCallback(
		(newValue: T) => {
			setValue(newValue);
			temporaryStorage.set(key, JSON.stringify(newValue));
		},
		[key],
	);

	return [value, setAndStoreValue] as const;
}

function EventCard({ event }: { event: Event }) {
	return (
		<Link href={`/dashboard/events/${event.event_id}`}>
			<div className="overflow-hidden rounded-md border">
				<div className="flex aspect-video">
					<div className="aspect-video w-96 flex-shrink bg-gray-300"></div>
				</div>
				<div className="p-4">
					<h2 className="text-lg font-semibold">{event.name}</h2>
					<p className="text-sm">{event.description}</p>
				</div>
			</div>
		</Link>
	);
}

function arrayShallowEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((v, i) => v === b[i]);
}

export default function List(props: {
	events: Event[];
	categories: Category[];
	filterCategories: string[];
}) {
	const [events, setEvents] = useSessionStorage("events", props.events);
	const [page, setPage] = useSessionStorage("page", 0);
	const [more, setMore] = useSessionStorage("more", props.events.length === RESULTS_PER_QUERY);
	const [filterCategories, setFilterCategories] = useSessionStorage(
		"filter",
		props.filterCategories,
	);

	const [showFilters, setShowFilters] = useState(false);
	const [loading, startTransition] = useTransition();

	useLayoutEffect(() => {
		if (!arrayShallowEqual(filterCategories, props.filterCategories)) {
			setEvents(props.events);
			setPage(0);
			setMore(props.events.length === RESULTS_PER_QUERY);
		}
	}, [props.events, props.filterCategories, filterCategories, setEvents, setMore, setPage]);

	useEffect(() => {
		setFilterCategories(props.filterCategories);
	}, [props.filterCategories, setFilterCategories]);

	function getMoreEvents() {
		if (!more) {
			return;
		}

		startTransition(async () => {
			const newEvents = await getEvents(props.filterCategories, page + 1);
			setEvents([...events, ...newEvents]);
			setPage(page + 1);
			setMore(newEvents.length === RESULTS_PER_QUERY);
		});
	}

	function status() {
		switch (true) {
			case loading:
				return <p>Loading...</p>;
			case more:
				return <Button onClick={getMoreEvents}>Load more events</Button>;
			default:
				return <p>That{"'"}s all folks!</p>;
		}
	}

	return (
		<>
			<div className="space-y-8">
				<div className="flex items-center justify-end">
					<Button onClick={() => setShowFilters(true)}>Filters</Button>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{events.map((event) => (
						<EventCard key={event.event_id} event={event} />
					))}
				</div>
				<div className="flex items-center justify-center">{status()}</div>
			</div>
			{showFilters && (
				<div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-8 backdrop-blur-[2px]">
					<FiltersModal
						categories={props.categories}
						selectedCategories={props.filterCategories}
						onClose={() => setShowFilters(false)}
					/>
				</div>
			)}
		</>
	);
}
