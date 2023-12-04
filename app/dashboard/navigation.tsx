"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { PropsWithChildren } from "react";

const NavLink = (props: PropsWithChildren<{ current?: boolean | undefined; href: string }>) => {
	return (
		<Link href={props.href} className="flex-shrink-0">
			<li
				className={`relative cursor-pointer px-4 py-3 after:absolute after:inset-0 after:z-20 after:block after:border-b after:transition-colors ${
					props.current ? "font-semibold after:border-blue-700" : "hover:after:border-gray-400"
				}`}
			>
				{props.children}
			</li>
		</Link>
	);
};

interface Props {
	isAuthenticated: boolean;
}

export default function Navigation({ isAuthenticated }: Props) {
	const selected = useSelectedLayoutSegment();

	return (
		<nav>
			<ul role="list" className="flex overflow-x-auto overflow-y-hidden">
				<NavLink href="/">Home</NavLink>
				<NavLink current={selected === "events"} href="/dashboard/events">
					Events
				</NavLink>
				<NavLink current={selected === "awards"} href="/dashboard/awards">
					Awards
				</NavLink>
				<NavLink current={selected === "photos"} href="/dashboard/photos">
					Photos
				</NavLink>
				{isAuthenticated && (
					<>
						<NavLink current={selected === "organizer"} href="/dashboard/organizer">
							Organizer
						</NavLink>
						<NavLink current={selected === "account"} href="/dashboard/account">
							Account
						</NavLink>
					</>
				)}
			</ul>
		</nav>
	);
}
