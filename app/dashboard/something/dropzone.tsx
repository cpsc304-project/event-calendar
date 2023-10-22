"use client";

import { UploadDropzone } from "@/lib/components/uploadthing";
import { useRouter } from "next/navigation";

export default function Dropzone() {
	const router = useRouter();

	return (
		<UploadDropzone endpoint="imageUploader" onClientUploadComplete={() => router.refresh()} />
	);
}
