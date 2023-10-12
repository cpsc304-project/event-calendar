import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout(props: { loggedIn: React.ReactNode; loggedOut: React.ReactNode }) {
	return (
		<ClerkProvider>
			<SignedIn>{props.loggedIn}</SignedIn>
			<SignedOut>{props.loggedOut}</SignedOut>
		</ClerkProvider>
	);
}
