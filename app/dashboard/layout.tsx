import { ClerkProvider, auth } from "@clerk/nextjs";

export const runtime = "edge";

export default function Layout(props: { loggedIn: React.ReactNode; loggedOut: React.ReactNode }) {
	const { userId } = auth();

	return <ClerkProvider>{userId ? props.loggedIn : props.loggedOut}</ClerkProvider>;
}
