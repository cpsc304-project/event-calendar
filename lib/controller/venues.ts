import { db } from "../db";
import { Logger } from "../logger";
import { VenueInfo } from "../schema";

export async function getAll(): Promise<VenueInfo[]> {
	using logger = new Logger();
	const venues = await db.sql<VenueInfo[]>`
			SELECT
				venue_id,
				name,
				description,
				seats,
				venue_type_name,
				Venue.postal_code,
				Venue.country,
				street_number,
				street_name,
				a.city,
				a.province
			FROM Venue
			JOIN area a ON a.postal_code = Venue.postal_code AND a.country = Venue.country
		`;

	logger.debug("Venues", venues);

	return venues;
}
