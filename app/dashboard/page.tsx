import { currentUser } from "@clerk/nextjs";

export default async function Page() {
	const user = await currentUser();

	if (!user)
		return (
			<div>
				<h1>You aren{"'"}t signed in!</h1>
			</div>
		);

	if (!user.firstName)
		return (
			<div>
				<h1>You haven{"'"}t set your name yet!</h1>
			</div>
		);

	return (
		<div>
			<h1>Hi {user.firstName}!</h1>
		</div>
	);
}
