import { FilterProps } from "./sharedStore";
import { Event } from "@/lib/schema";

export interface Prefetch {
	events: Event[];
	filters: FilterProps;
}
