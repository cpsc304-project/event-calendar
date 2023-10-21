import { UploadDropzone } from "@/lib/components/uploadthing";

export default function Page() {
	return (
		<div>
			<UploadDropzone endpoint="imageUploader" />
		</div>
	);
}
