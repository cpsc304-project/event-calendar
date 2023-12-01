import { db } from "../db";
import { Logger } from "../logger";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AwardedGuest, AwardedOrganizer } from "../schema";

// TODO: add first and last name from kinde to guests
export async function getGuestsWhoAttendedAllEventsInCategory(category_name: string) {
	using logger = new Logger();
	const awardedGuests = await db.sql<AwardedGuest[]>`
	SELECT g.account_id, g.is_ubc_student, a.kinde_id
	FROM guest g
	JOIN account a ON g.account_id = a.account_id
	WHERE NOT EXISTS (
			SELECT ei.event_id
			FROM event_in_category ei
			WHERE ei.category_name = ${category_name}
			EXCEPT
			SELECT t.event_id
			FROM ticket t
			WHERE t.account_id = g.account_id
	);
		`;
	logger.debug("Awards: getGuestsWhoAttendedAllEventsInCategory: " + category_name, awardedGuests);
	return awardedGuests;
}


export async function getOrganizersWithEventsInAllCategories(): Promise<AwardedOrganizer[]> {
	using logger = new Logger();
	const awardedOrganizers = await db.sql<AwardedOrganizer[]>`
	SELECT o.account_id, o.organization_name
	FROM organizer o
	WHERE NOT EXISTS (
    SELECT c.category_name
    FROM category c
    EXCEPT
    SELECT ec.category_name
    FROM event_in_category ec
		JOIN event e ON ec.event_id = e.event_id
    WHERE e.organizer_id = o.account_id
	);`;

	if (awardedOrganizers.length == 0) {
		logger.debug("Awards: getOrganizerWithEventsInAllCategories: No awarded organizers found.");
	} else {
		logger.debug("Awards: getOrganizerWithEventsInAllCategories: ", awardedOrganizers);
	}
	return awardedOrganizers;
}
