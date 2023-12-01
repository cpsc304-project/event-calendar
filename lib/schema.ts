import { zfd } from "zod-form-data";

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
	seats: number | null;
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

export interface Category {
	category_name: string;
	description: string;
}

export interface EventInCategory {
	event_id: number;
	category_name: string;
}

export interface Ticket {
	ticket_id: number;
	event_id: number;
	account_id: number | null;
	cost: number;
}

export interface DiscountedTicket {
	ticket_id: number;
	event_id: number;
	discount: number;
	promo_code: string;
}

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

export interface Message {
	message_id: number;
	title: string;
	content: string;
}

export interface PotentialMessage extends Message {
	optimistic: boolean;
}

export const MessageForm = zfd.formData({
	title: zfd.text(),
	content: zfd.text(),
});

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
	start_date: string;
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

export interface VenueInfo {
	name: string;
	description: string;
	seats: number;
	venue_type_name: string;
	postal_code: string;
	country: string;
	street_number: string;
	street_name: string;
	city: string;
	province: string;
}

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
