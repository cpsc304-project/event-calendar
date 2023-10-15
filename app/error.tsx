"use client";

import { useLogger } from "next-axiom";
import { useEffect } from "react";

interface Props {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: Props) {
	const log = useLogger();

	useEffect(() => {
		log.error("Error occured at root error boundary", error);
	}, [log, error]);

	return (
		<div className="flex h-screen flex-col items-center justify-around">
			<h1 className="text-xl font-bold">Insert Logo Here</h1>
			<div className="text-center">
				<span className="flex divide-x-2 divide-black">
					<h2 className="pr-2 font-semibold">500</h2>
					<h3 className="pl-2">An unexpected error occured</h3>
				</span>
				<button onClick={() => reset()}>Try again</button>
			</div>
		</div>
	);
}
