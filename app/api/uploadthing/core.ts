import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async () => {
			console.log("starting upload");
			const { getUser, isAuthenticated } = getKindeServerSession();
			if (!isAuthenticated()) throw new Error("Unauthorized");
			const kindeUser = getUser();
			if (!kindeUser.id) throw new Error("Unauthorized");
			const user = await db.users.getByKindeId(kindeUser.id);
			if (!user) throw new Error("Unauthorized");
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.url);
			db.files.add({ url: file.url, user_id: metadata.userId });
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
