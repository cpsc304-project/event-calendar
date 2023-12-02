"use client";

import type { Category, Event } from "@/lib/schema";
import {
	useState,
	useTransition,
	useLayoutEffect,
	useCallback,
	useRef,
	useEffect,
	useReducer,
} from "react";
import { getEvents } from "./actions";
import { RESULTS_PER_QUERY } from "@/lib/constants";
import Link from "next/link";
import FiltersModal from "./FiltersModal";
import Button from "@/lib/components/Button";
import { temporaryStorage } from "./storage";
import { usePathname, useRouter } from "next/navigation";

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
		<Link href={`/dashboard/events/${event.event_id}`} className="h-96 w-80">
			<div className="h-full rounded-md border">
				<div className="aspect-[4/3] bg-gray-300"></div>
				<div className="p-4">
					<h2 className="h-8 overflow-hidden text-base font-semibold">{event.name}</h2>
					<p className="h-20 overflow-hidden text-sm">{event.description}</p>
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
	filterPopular: boolean;
	filterDeals: boolean;
}) {
	const pathname = usePathname();
	const router = useRouter();

	const [events, setEvents] = useSessionStorage("events", props.events);
	const [page, setPage] = useSessionStorage("page", 0);
	const [more, setMore] = useSessionStorage("more", props.events.length === RESULTS_PER_QUERY);
	const [filterPopular, setFilterPopular] = useSessionStorage("popular", props.filterPopular);
	const [filterDeals, setFilterDeals] = useSessionStorage("deals", props.filterDeals);
	const [filterCategories, setFilterCategories] = useSessionStorage(
		"filter",
		props.filterCategories,
	);

	const [showFilters, setShowFilters] = useState(false);
	const [loading, startTransition] = useTransition();

	useLayoutEffect(() => {
		if (
			arrayShallowEqual(filterCategories, props.filterCategories) &&
			filterPopular === props.filterPopular &&
			filterDeals === props.filterDeals
		)
			return;
		setEvents(props.events);
		setPage(0);
		setMore(props.events.length === RESULTS_PER_QUERY);
	}, [
		filterCategories,
		filterDeals,
		filterPopular,
		props.events,
		props.filterCategories,
		props.filterDeals,
		props.filterPopular,
		setEvents,
		setMore,
		setPage,
	]);

	useEffect(() => {
		setFilterCategories(props.filterCategories);
		setFilterPopular(props.filterPopular);
		setFilterDeals(props.filterDeals);
	}, [
		props.filterCategories,
		props.filterDeals,
		props.filterPopular,
		setFilterCategories,
		setFilterDeals,
		setFilterPopular,
	]);

	function getMoreEvents() {
		if (!more) {
			return;
		}

		startTransition(async () => {
			const newEvents = await getEvents(
				props.filterCategories,
				props.filterPopular,
				props.filterDeals,
				page + 1,
			);
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

	function getGreatDeals() {
		const params = new URLSearchParams();
		if (!filterDeals) {
			params.set("deals", "true");
		}
		router.push(`${pathname}?${params.toString()}`);
	}

	function getPopularEvents() {
		const params = new URLSearchParams();
		if (!filterPopular) {
			params.set("popular", "true");
		}
		router.push(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<div className="space-y-8">
				<div className="flex items-center justify-end gap-2">
					<Button fill className="bg-indigo-500" onClick={() => getGreatDeals()}>
						Great Deals
					</Button>
					<Button fill className="bg-amber-500" onClick={() => getPopularEvents()}>
						Popular Events
					</Button>
					<Button onClick={() => setShowFilters(true)}>Filters</Button>
				</div>
				<div className="grid justify-center gap-4 [grid-template-columns:repeat(auto-fit,20rem)]">
					{events.map((event) => (
						<EventCard key={event.event_id} event={event} />
					))}
				</div>
				<div className="flex flex-col items-center">{status()}</div>
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
