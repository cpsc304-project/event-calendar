import { ClerkLoaded, ClerkLoading, SignOutButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

const CustomSignOutButton = () => (
	<>
		<ClerkLoading>
			<button key="sign-out">Sign out pls</button>
		</ClerkLoading>
		<ClerkLoaded>
			<SignOutButton>
				<button key="sign-out">Sign out pls</button>
			</SignOutButton>
		</ClerkLoaded>
	</>
);

export default async function Page() {
	const user = await currentUser();

	if (!user) return null;

	return (
		<div>
			<Link href="/">Go home</Link>
			<h1>Hi {user.firstName}!</h1>
			<CustomSignOutButton />
		</div>
	);
}
