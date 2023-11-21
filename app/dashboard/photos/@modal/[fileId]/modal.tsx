/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

interface Props {
	src: string;
}

export default function ImageModal(props: Props) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.back()}
			className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-70 p-8 backdrop-blur"
		>
			<img src={props.src} alt="User submitted image" className="h-full object-contain" />
		</div>
	);
}
