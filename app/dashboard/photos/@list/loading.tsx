import Dropzone from "./dropzone";

export default function Loading() {
	return (
		<div className="space-y-4">
			<Dropzone />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(10)].map((_, i) => (
					<div
						key={`image-placeholder-${i}`}
						className="aspect-square animate-pulse rounded-md bg-gray-100"
					/>
				))}
			</div>
		</div>
	);
}
