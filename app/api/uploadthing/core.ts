import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Logger } from "@/lib/logger";
import { revalidateTag } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async () => {
			using logger = new Logger();
			logger.debug("Starting image upload");

			const { getUser } = getKindeServerSession();
			const kindeUser = await getUser();
			if (!kindeUser) {
				logger.warn("An unauthenticated user tried to upload an image");
				throw new Error("Unauthorized");
			}

			const account = await db.accounts.getByKindeId(kindeUser.id);
			logger.debug("Image upload accepted", { accountId: account.accountId });

			return { accountId: account.accountId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			using logger = new Logger();

			logger.debug("Image upload completed", {
				accountId: metadata.accountId,
				fileKey: file.key,
				fileUrl: file.url,
			});

			const dbFile = await db.files.add({ url: file.url, accountId: metadata.accountId });
			logger.debug("Image added", { fileId: dbFile.fileId });

			revalidateTag("all-files");
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
