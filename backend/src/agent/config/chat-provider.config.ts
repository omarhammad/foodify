import { z } from "zod";

const ollamaConfigSchema = z.object({
    provider: z.literal("ollama"),
    host: z.url().default("http://127.0.0.1:11434"),
    model: z.string().min(1),
});

const azureOpenAiConfigSchema = z.object({
    provider: z.literal("azure-openai"),
    endpoint: z.url(),
    apiKey: z.string().min(1),
    deployment: z.string().min(1),
    apiVersion: z.string().default("2024-10-21"),
});

export const chatProviderConfigSchema = z.discriminatedUnion("provider", [
    ollamaConfigSchema,
    azureOpenAiConfigSchema,
]);

export type ChatProviderConfig = z.infer<typeof chatProviderConfigSchema>;
export type OllamaConfig = z.infer<typeof ollamaConfigSchema>;
export type AzureOpenAiConfig = z.infer<typeof azureOpenAiConfigSchema>;