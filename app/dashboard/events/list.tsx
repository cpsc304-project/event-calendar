"use client";

import type { Category, Event } from "@/lib/schema";
import { useState, useTransition, SetStateAction, PropsWithChildren, ComponentProps } from "react";
import { getEvents } from "./actions";
import { RESULTS_PER_QUERY } from "@/lib/constants";
import Link from "next/link";
import Filters from "./filters";
import Button from "@/lib/components/Button";

const cursedStorage = new Map<string, string>();

function useSessionStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState(() => {
		const storedValue = cursedStorage.get(key);
		if (storedValue) {
			return JSON.parse(storedValue) as T;
		} else {
			return initialValue;
		}
	});

	function setAndStoreValue(newValue: SetStateAction<T>) {
		setValue(newValue);
		if (typeof newValue === "function") {
			cursedStorage.set(key, JSON.stringify((newValue as (prevState: T) => T)(value)));
		} else {
			cursedStorage.set(key, JSON.stringify(newValue));
		}
	}

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

export default function List(props: { initialEvents: Event[]; categories: Category[] }) {
	const [events, setEvents] = useSessionStorage("events", props.initialEvents);
	const [page, setPage] = useSessionStorage("events-page", 0);
	const [hasMore, setHasMore] = useSessionStorage(
		"events-hasMore",
		props.initialEvents.length === RESULTS_PER_QUERY,
	);
	const [loading, startTransition] = useTransition();

	function getMoreEvents() {
		if (!hasMore) {
			return;
		}

		startTransition(async () => {
			const newEvents = await getEvents(page + 1);
			setEvents([...events, ...newEvents]);
			setPage(page + 1);
			setHasMore(newEvents.length === RESULTS_PER_QUERY);
		});
	}

	function status() {
		switch (true) {
			case loading:
				return <p>Loading...</p>;
			case hasMore:
				return <Button onClick={getMoreEvents}>Load more events</Button>;
			default:
				return <p>That{"'"}s all folks!</p>;
		}
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{events.map((event) => (
					<EventCard key={event.event_id} event={event} />
				))}
			</div>
			<div className="mt-4 flex items-center justify-center">{status()}</div>
			<div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-8 backdrop-blur-[2px]">
				<Filters categories={props.categories} />
			</div>
		</div>
	);
}
