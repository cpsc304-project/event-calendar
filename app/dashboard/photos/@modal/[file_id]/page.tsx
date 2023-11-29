import { db } from "@/lib/db";
import ImageModal from "./modal";

export default async function Page(props: { params: { file_id: string } }) {
	const file_id = Number(props.params.file_id);
	if (isNaN(file_id)) return null;

	const file = await db.files.get(file_id);
	if (!file) return null;

	return <ImageModal src={file.url} />;
}
