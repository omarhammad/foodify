import type { ChatProviderConfig } from "@agent/config/chat-provider.config.js";
import { OllamaChatAdapter } from "@agent/adapter/out/chat-agents/ollama-chat.adapter.js";
import {ChatPort} from "@agent/port/out /chat-port.js";
import {AzureOpenAiChatAdapter} from "@agent/adapter/out/chat-agents/azure.openai-chat.adapter.js";

export function createChatAdapter(config: ChatProviderConfig): ChatPort {
    switch (config.provider) {
        case "ollama":       return new OllamaChatAdapter(config);
        case "azure-openai": return new AzureOpenAiChatAdapter(config);
        default:             return assertNever(config);
    }
}
function assertNever(value: never): never {
    throw new Error(`Unhandled chat provider: ${JSON.stringify(value)}`);
}