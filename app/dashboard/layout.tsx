import { LoginLink, LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Navigation from "./navigation";

const LoggedInToolbar = () => {
	const { getUser } = getKindeServerSession();
	const user = getUser();
	return (
		<>
			<h1>Hi {user.given_name}!</h1>
			<LogoutLink>Sign out pls</LogoutLink>
		</>
	);
};

const LoggedOutToolbar = () => <LoginLink>Sign in pls</LoginLink>;

export const runtime = "edge";

interface Props {
	children: React.ReactNode;
}

export default function Layout(props: Props) {
	const { isAuthenticated } = getKindeServerSession();

	const loggedIn = isAuthenticated();

	return (
		<>
			<header className="relative space-y-6 px-6 pt-6 after:absolute after:inset-x-0 after:bottom-0 after:z-30 after:block after:border-b sm:px-12">
				<div className="flex items-center justify-between">
					<Link href="/">
						<h2>Insert Logo Here</h2>
					</Link>
					<span className="flex gap-4">
						{loggedIn ? <LoggedInToolbar /> : <LoggedOutToolbar />}
					</span>
				</div>
				<Navigation />
			</header>
			<main className="p-6 sm:p-12">{props.children}</main>
		</>
	);
}
