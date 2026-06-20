import { z } from "zod";

export const chatRequestBodySchema = z.object({
    prompt: z.string().min(1),
});

export type ChatRequestBody = z.infer<typeof chatRequestBodySchema>;