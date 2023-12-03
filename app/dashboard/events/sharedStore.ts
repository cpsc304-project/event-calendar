import { Category } from "@/lib/schema";
import { createStore } from "zustand";

export type NoFilter = "none";
export type PopularFilter = "popular";
export type DealsFilter = "deals";
export type CustomFilter = "custom";

export type Filter = NoFilter | PopularFilter | DealsFilter | CustomFilter;

export interface FilterProps {
	filter: Filter;
	categories: string[];
}

export interface FilterState extends FilterProps {
	setFilters: (filters: FilterProps) => void;
}

export type FilterStore = ReturnType<typeof createFilterStore>;

export function createFilterStore(initialProps?: Partial<FilterProps>) {
	const defaultProps: FilterProps = {
		filter: "none",
		categories: [],
	};
	return createStore<FilterState>()((set, get) => ({
		...defaultProps,
		...initialProps,
		setFilters(filters) {
			set(structuredClone(filters));
		},
	}));
}
