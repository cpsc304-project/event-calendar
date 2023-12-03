"use client";

import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { create, useStore } from "zustand";
import { FilterProps, FilterState, FilterStore, createFilterStore } from "./sharedStore";
import { RESULTS_PER_QUERY } from "@/lib/constants";
import type { Event } from "@/lib/schema";
import { getEvents } from "./actions";
import { Prefetch } from "./prefetch";

function arrayShallowEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((v, i) => v === b[i]);
}

const filterPropsAreEqual = (fs1: FilterProps, fs2: FilterProps) =>
	fs1.filter === fs2.filter && arrayShallowEqual(fs1.categories, fs2.categories);

export const FilterStoreContext = createContext<FilterStore | null>(null);

type FilterProviderProps = PropsWithChildren<FilterProps>;

export function FilterProvider({ children, ...props }: FilterProviderProps) {
	const storeRef = useRef<FilterStore>();
	if (!storeRef.current) {
		storeRef.current = createFilterStore(props);
	}

	return (
		<FilterStoreContext.Provider value={storeRef.current}>{children}</FilterStoreContext.Provider>
	);
}

export function useFilterStore(): FilterState;
export function useFilterStore<U>(selector: (state: FilterState) => U): U;
export function useFilterStore<U>(selector?: (state: FilterState) => U): FilterState | U {
	const store = useContext(FilterStoreContext);
	if (!store) {
		throw new Error("useFilterStore must be used within a FilterProvider");
	}

	if (selector) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useStore(store, selector);
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useStore(store);
	}
}

export interface EventProps {
	events: Event[];
	filters: FilterProps;
	nextPage: number;
	more: boolean;
}

export interface EventState extends EventProps {
	applyPrefetch(prefetch: Prefetch): void;
	getEventsFor(filters: FilterProps): Promise<void>;
	getMoreEvents(): Promise<void>;
}

export type EventStore = typeof useEvents;

export const useEvents = create<EventState>()((set, get) => ({
	events: [],
	filters: {
		filter: "none",
		categories: [],
	},
	nextPage: 0,
	more: true,

	applyPrefetch(prefetch) {
		if (
			filterPropsAreEqual(get().filters, prefetch.filters) &&
			get().events.length > prefetch.events.length
		)
			return;

		set({
			events: prefetch.events,
			filters: structuredClone(prefetch.filters),
			nextPage: 1,
			more: prefetch.events.length === RESULTS_PER_QUERY,
		});
	},

	async getEventsFor(filters) {
		console.log("Starting server action.");
		const newEvents = await getEvents(filters, 0);
		console.log("Server action completed.", { result: newEvents });

		set({
			events: newEvents,
			filters: structuredClone(filters),
			nextPage: 1,
			more: newEvents.length === RESULTS_PER_QUERY,
		});
	},

	async getMoreEvents() {
		console.log("Starting server action.");
		const newEvents = await getEvents(get().filters, get().nextPage);
		console.log("Server action completed.", { result: newEvents });

		set({
			events: [...get().events, ...newEvents],
			nextPage: get().nextPage + 1,
			more: newEvents.length === RESULTS_PER_QUERY,
		});
	},
}));
