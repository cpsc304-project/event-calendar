import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Logger } from "next-axiom";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async () => {
			const logger = new Logger();
			try {
				logger.debug("Starting image upload");

				const { getUser, isAuthenticated } = getKindeServerSession();
				if (!isAuthenticated()) {
					logger.warn("An unauthenticated user tried to upload an image");
					throw new Error("Unauthorized");
				}

				const kindeUser = getUser();
				if (!kindeUser.id) {
					logger.error("Kinde user is missing an ID", { user: kindeUser });
					throw new Error("Unauthorized");
				}

				const user = await db.users.getByKindeId(kindeUser.id);
				logger.debug("Image upload accepted", { userId: user.id });

				return { userId: user.id };
			} finally {
				void logger.flush();
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const logger = new Logger();

			logger.debug("Image upload completed", {
				userId: metadata.userId,
				fileKey: file.key,
				fileUrl: file.url,
			});

			void logger.flush();
			await db.files.add({ url: file.url, userId: metadata.userId });
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
