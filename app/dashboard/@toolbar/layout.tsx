import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default function Layout(props: { loggedIn: React.ReactNode; loggedOut: React.ReactNode }) {
	const { isAuthenticated } = getKindeServerSession();

	const loggedIn = isAuthenticated();

	return (
		<header className="flex items-center justify-between px-8 py-4">
			<Link href="/">
				<h2>Insert Logo Here</h2>
			</Link>
			<span className="flex gap-4">{loggedIn ? props.loggedIn : props.loggedOut}</span>
		</header>
	);
}
