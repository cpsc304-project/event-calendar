/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

interface Props {
	src: string;
}

export default function ImageModal(props: Props) {
	const router = useRouter();

	return (
		<>
			<div onClick={() => router.back()} className="fixed inset-0 z-30 bg-black bg-opacity-70" />
			<div className="pointer-events-none fixed inset-8 z-30 flex items-center justify-center">
				<img src={props.src} alt="User submitted image" className="pointer-events-auto h-full" />
			</div>
		</>
	);
}
