import { db } from "@/lib/db";
import { AwardedOrganizer } from "@/lib/schema";
import { createKindeManagementAPIClient } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
	const awardedGuestsTechnology =
		await db.awards.getGuestsWhoAttendedAllEventsInCategory("Technology");

	const apiClient = await createKindeManagementAPIClient();
	for (const guest of awardedGuestsTechnology) {
		const user = await apiClient.usersApi.getUserData({ id: guest.kinde_id });
		guest.first_name = user.firstName;
		guest.last_name = user.lastName;
	}

	// const mockAwardedOrganizers: AwardedOrganizer[] = [
	// 	{
	// 		account_id: 1,
	// 		organization_name: "Theater Group",
	// 	},
	// 	{
	// 		account_id: 42,
	// 		organization_name: "JorgePorge",
	// 	},
	// ];

	const awardedOrganizer = await db.awards.getOrganizersWithEventsInAllCategories();
	return (
		<>
			{/* Organizer Dashboard Container Start */}
			<div className="flex flex-col">
				<div className="mb-3 text-4xl">Event Calendar Awards</div>
				<h4 className="text-lg">Let&apos;s give a hand to these Event Calendar rockstars!</h4>
				<hr className="mb-3" />
				<div className="">
					<div className="container">
						<div className="my-1">
							<div className="inline-flex text-2xl">
								The Organizer With Many Hats{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="ml-2 h-8 w-8 self-center text-indigo-600"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
									/>
								</svg>
							</div>
							<h5>
								This award is given to organizers with events in every one of Event Calendar&apos;s
								categories
							</h5>
						</div>
						<div className="border-2 border-dotted p-3">
							{awardedOrganizer.length === 0 && (
								<div className="text-lg">No organizers have events in all categories</div>
							)}
							{awardedOrganizer.map((organizer) => (
								<div key={organizer.account_id} className="my-1">
									<div className="inline-flex text-lg">
										{organizer.organization_name}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="ml-2 h-6 w-6 self-center text-amber-400"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
											/>
										</svg>
									</div>
								</div>
							))}
						</div>
						<hr className="my-2" />
					</div>
					<div className="container">
						<div className="my-1">
							<div className="inline-flex text-2xl">
								The Gearhead
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="ml-2 h-8 w-8 self-center text-indigo-600"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<h5>
								This award is given to guests that have attended all events in the Technology
								category
							</h5>
						</div>
						<div className="border-2 border-dotted p-3">
							{awardedGuestsTechnology.length === 0 && (
								<div className="text-lg">
									No guests have attended all events in the Technology Category
								</div>
							)}
							{awardedGuestsTechnology.map((guest) => (
								<div key={guest.account_id} className="my-1">
									<div className="inline-flex text-lg">
										{guest.first_name} {guest.last_name}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="ml-2 h-6 w-6 self-center text-amber-400"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
											/>
										</svg>
									</div>
								</div>
							))}
						</div>{" "}
						<hr className="my-2" />
					</div>
				</div>
			</div>
			{/* Organizer Dashboard Container End */}
		</>
	);
}
