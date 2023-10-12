import { z } from "zod";
import { zfd } from "zod-form-data";

export const Message = z.object({
	id: z.number(),
	title: z.string(),
	content: z.string(),
});

export type Message = z.infer<typeof Message>;

export const MessageForm = zfd.formData({
	title: zfd.text(),
	content: zfd.text(),
});
