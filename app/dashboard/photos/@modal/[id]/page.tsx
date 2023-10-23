import { db } from "@/lib/db";
import ImageModal from "./modal";

export default async function Page(props: { params: { id: string } }) {
	const id = Number(props.params.id);
	if (isNaN(id)) return null;

	const file = await db.files.get(id);
	if (!file) return null;

	return <ImageModal src={file.url} />;
}
