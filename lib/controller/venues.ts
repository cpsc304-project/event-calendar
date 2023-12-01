import { db } from "../db";
import { Logger } from "../logger";
import { Area, NewVenueWithArea, Venue, VenueType, VenueWithArea } from "../schema";

export async function getAll(): Promise<VenueWithArea[]> {
	using logger = new Logger();

	const venues = await db.sql<VenueWithArea[]>`
			SELECT
				v.venue_id,
				v.name,
				v.description,
				v.seats,
				v.venue_type_name,
				v.postal_code,
				v.country,
				v.street_number,
				v.street_name,
				a.city,
				a.province
			FROM venue AS v
			INNER JOIN area AS a ON v.postal_code = a.postal_code AND v.country = a.country
		`;

	logger.debug("venues.getAll", { venues });

	return venues;
}

export async function createWithArea(newVenue: NewVenueWithArea): Promise<VenueWithArea> {
	using logger = new Logger();

	const {
		name,
		description,
		seats,
		venue_type_name,
		postal_code,
		country,
		street_number,
		street_name,
		city,
		province,
	} = newVenue;

	const [area] = await db.sql<[Area?]>`
		INSERT INTO area
			(postal_code, country, city, province)
		VALUES
			(${postal_code}, ${country}, ${city}, ${province})
		ON CONFLICT (postal_code, country) DO UPDATE
		SET
			postal_code = area.postal_code,
			country = area.country
		RETURNING
			postal_code, country, city, province
	`;

	if (!area) {
		throw new Error("Failed to create area while creating venue");
	}

	const [venue] = await db.sql<[Venue?]>`
		INSERT INTO venue
			(name, description, seats, venue_type_name, postal_code, country, street_number, street_name)
		VALUES
			(${name}, ${description}, ${seats}, ${venue_type_name}, ${area.postal_code}, ${area.country}, ${street_number}, ${street_name})
		RETURNING
			venue_id, name, description, seats, venue_type_name, postal_code, country, street_number, street_name
	`;

	if (!venue) {
		throw new Error("Failed to create venue");
	}

	logger.debug("venues.createWithArea", { area, venue });

	return { ...venue, ...area };
}

export async function getTypes(): Promise<VenueType[]> {
	using logger = new Logger();

	const types = await db.sql<VenueType[]>`
		SELECT
			venue_type_name,
			description
		FROM venue_type
	`;

	logger.debug("venues.getTypes", { types });

	return types;
}
