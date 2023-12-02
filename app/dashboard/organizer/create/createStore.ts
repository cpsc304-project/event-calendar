import { VenueWithArea } from "@/lib/schema";
import { create } from "zustand";

export interface CreateState {
	venue: VenueWithArea | undefined;
}

export interface CreateActions {
	updateVenue(venue: VenueWithArea): void;
}

export const useCreateStore = create<CreateState & CreateActions>((set) => ({
	venue: undefined,
	updateVenue: (venue) => set(() => ({ venue })),
}));
