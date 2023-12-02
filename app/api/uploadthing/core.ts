import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Logger } from "next-axiom";
import { revalidateTag } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async () => {
			const logger = new Logger();
			try {
				logger.debug("Starting image upload");

				const { getUser } = getKindeServerSession();
				const kindeUser = await getUser();
				if (!kindeUser) {
					logger.warn("An unauthenticated user tried to upload an image");
					throw new Error("Unauthorized");
				}

				const account = await db.accounts.getByKindeId(kindeUser.id);
				logger.debug("Image upload accepted", { account_id: account.account_id });

				return { account_id: account.account_id };
			} finally {
				logger.flush();
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const logger = new Logger();
			try {
				logger.debug("Image upload completed", {
					account_id: metadata.account_id,
					fileKey: file.key,
					fileUrl: file.url,
				});

				const dbFile = await db.files.add({ url: file.url, account_id: metadata.account_id });
				logger.debug("Image added", { file_id: dbFile.file_id });

				revalidateTag("all-files");
			} finally {
				logger.flush();
			}
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
