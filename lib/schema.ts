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
