import "../../config.js";
import { z } from "zod";
import { chatProviderConfigSchema } from "@agent/config/chat-provider.config.js";

const result = chatProviderConfigSchema.safeParse({
    provider: process.env.CHAT_CLIENT,
    host: process.env.OLLAMA_HOST,
    model: process.env.OLLAMA_MODEL,
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

if (!result.success) {
    console.error("❌ Invalid chat provider config:\n" + z.prettifyError(result.error));
    process.exit(1);
}

export const agentConfig = Object.freeze(result.data);