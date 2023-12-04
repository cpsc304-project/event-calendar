export interface Account {
	account_id: number;
	kinde_id: string;
}

export interface Organizer {
	account_id: number;
	organization_name: string;
}

export interface Guest {
	account_id: number;
	is_ubc_student: boolean;
}

export interface VenueType {
	venue_type_name: string;
	description: string;
}

export interface Area {
	postal_code: string;
	country: string;
	city: string;
	province: string;
}

export interface Venue {
	venue_id: number;
	name: string;
	description: string;
	seats: number;
	venue_type_name: string;
	postal_code: string;
	country: string;
	street_number: number;
	street_name: string;
}

export interface Event {
	event_id: number;
	name: string;
	description: string;
	start_date: Date;
	end_date: Date;
	organizer_id: number;
	venue_id: number;
}

export type EventWithVenueAndAreaAndCategories = Event & {
	venue: Venue & Area;
	categories: Category[];
	ticket_count: number;
};

export type NewEvent = Omit<
	Event & { ticket_count: number; ticket_cost: number; category_names: string[] },
	"event_id"
>;

export interface Category {
	category_name: string;
	description: string;
}

export interface GetCategoriesByEventIdReturn {
	category_name: string;
	event_id: number;
	description: string;
}

export interface EventInCategory {
	event_id: number;
	category_name: string;
}

export interface Ticket {
	ticket_id: string;
	event_id: number;
	account_id: number | null;
	cost: string;
	discount?: string;
	promo_code?: string;
}

export interface DiscountedTicket {
	ticket_id: string;
	event_id: number;
	discount: number;
	promo_code: string;
}

export type TicketInfo = Ticket & Event;

export interface Review {
	review_id: number;
	rating: number;
	comment: string | null;
	account_id: number;
	event_id: number;
}

export interface File {
	file_id: number;
	account_id: number;
	url: string;
}

export interface EventGetByOrganizerId {
	event_id: number;
	event_name: string;
	event_description: string;
	start_date: Date;
	end_date: Date;
	venue_name: string;
	venue_description: string;
	venue_seats: number | null;
	venue_street_number: number;
	venue_street_name: string;
	venue_country: string;
	venue_postal_code: string;
	venue_type_name: string;
	venue_type_description: string;
	category_name: string;
	category_description: string;
}

export interface EventGetByEventId {
	event_id: number;
	event_name: string;
	event_description: string;
	start_date: Date;
	end_date: Date;
	venue_name: string;
	venue_description: string;
	venue_seats: number;
	venue_street_number: number;
	venue_street_name: string;
	venue_country: string;
	venue_postal_code: string;
	venue_type_name: string;
	venue_type_description: string;
	category_name: string;
	category_description: string;
	venue_city: string;
	venue_province: string;
	organizer_name: string;
	organizer_id: number;
}

export type VenueWithArea = Venue & Area;

export type NewVenueWithArea = Omit<VenueWithArea, "venue_id">;

export interface GetCategoriesByEventIdReturn {
	category_name: string;
	event_id: number;
	description: string;
}

export interface ReviewGetAllByEventId {
	review_id: number;
	rating: number;
	comment: string | null;
	account_id: number;
	event_id: number;
}

export interface AwardedGuest {
	account_id: number;
	is_ubc_student: boolean;
	kinde_id: string;
	first_name?: string;
	last_name?: string;
}

export interface AwardedOrganizer {
	account_id: number;
	organization_name: string;
}
