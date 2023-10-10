import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
	currentUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Balls = async () => {
	const user = await currentUser();

	if (!user) throw new Error("Expected user to be signed in.");

	return (
		<div>
			<UserButton />
			<h1>Hi {user.firstName}!</h1>
			<SignOutButton />
		</div>
	);
};

export default async function Page() {
	return (
		<div>
			<Link href="/">Go home</Link>
			<SignedIn>
				<Balls />
			</SignedIn>
			<SignedOut>
				<div>
					<h1>Not logged in</h1>
					<SignInButton />
				</div>
			</SignedOut>
		</div>
	);
}
