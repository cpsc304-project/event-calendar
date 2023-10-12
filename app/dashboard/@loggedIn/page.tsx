import { SignOutButton, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
	const user = await currentUser();

	if (!user) throw new Error("Expected user to be signed in.");

	return (
		<div>
			<Link href="/">Go home</Link>
			<UserButton />
			<h1>Hi {user.firstName}!</h1>
			<SignOutButton />
		</div>
	);
}
