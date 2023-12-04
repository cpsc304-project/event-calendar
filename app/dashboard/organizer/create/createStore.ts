import { VenueWithArea } from "@/lib/schema";
import { create } from "zustand";

export interface CreateProps {
	readonly venue: VenueWithArea | undefined;
}

export interface CreateState extends CreateProps {
	updateVenue(venue: VenueWithArea): void;
}

export const useCreateStore = create<CreateState>((set) => ({
	venue: undefined,
	updateVenue(venue) {
		set(() => ({ venue }));
	},
}));
