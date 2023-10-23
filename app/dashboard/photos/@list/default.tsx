import { db } from "@/lib/db";
import Image from "next/image";
import Dropzone from "./dropzone";
import Link from "next/link";

export default async function Default() {
	const files = await db.files.getAll();

	return (
		<div className="space-y-4">
			<Dropzone />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{files.map((file, i) => (
					<Link
						key={`image-${file.id}`}
						href={`/dashboard/photos/${file.id}`}
						scroll={false}
						className="relative aspect-square overflow-hidden rounded-xl before:inset-0 before:block before:aspect-square before:animate-pulse before:bg-gray-100"
					>
						<Image
							src={file.url}
							priority={i === 0}
							alt="User uploaded photo"
							fill
							className="object-cover"
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
