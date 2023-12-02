import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import Navigation from "./navigation";
import { PropsWithChildren } from "react";
import Button from "@/lib/components/Button";
import Logo from "@/lib/components/Logo";

const LoggedInToolbar = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div className="flex items-center gap-4">
			<h1 className="hidden sm:block">Hi {user?.given_name ?? "unknown"}!</h1>
			<LogoutLink>
				<Button>Sign out</Button>
			</LogoutLink>
		</div>
	);
};

const LoggedOutToolbar = () => (
	<LoginLink>
		<Button>Sign in</Button>
	</LoginLink>
);

export const runtime = "edge";

export default async function Layout(props: PropsWithChildren) {
	const { isAuthenticated } = getKindeServerSession();
	const loggedIn = await isAuthenticated();

	return (
		<>
			<header className="relative space-y-6 px-6 pt-6 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:block after:border-b sm:px-12">
				<div className="flex items-center justify-between">
					<Link href="/">
						<Logo />
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
