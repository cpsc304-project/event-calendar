import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Page() {
	const { getUser } = getKindeServerSession();

	const user = getUser();

	return (
		<>
			<h1>Hi {user.given_name}!</h1>
			<LogoutLink>Sign out pls</LogoutLink>
		</>
	);
}
