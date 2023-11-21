import { db } from "@/lib/db";
import ImageModal from "./modal";

export default async function Page(props: { params: { fileId: string } }) {
	const fileId = Number(props.params.fileId);
	if (isNaN(fileId)) return null;

	const file = await db.files.get(fileId);
	if (!file) return null;

	return <ImageModal src={file.url} />;
}
