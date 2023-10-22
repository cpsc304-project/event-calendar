import { db } from "@/lib/db";
import Image from "next/image";
import Dropzone from "./dropzone";

export default async function Page() {
	const files = await db.files.getAll();

	return (
		<div className="space-y-4">
			<Dropzone />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{files.map((file, i) => (
					<div
						key={`image-${file.id}`}
						className="relative aspect-square overflow-hidden rounded-xl before:inset-0 before:block before:aspect-square before:animate-pulse before:bg-gray-100"
					>
						<Image
							src={file.url}
							priority={i === 0}
							alt="User uploaded photo"
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
