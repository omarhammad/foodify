import type { ChatMessage } from "@agent/domain/chat-message.js";

export interface ChatPort {
    chat(messages: ChatMessage[]): AsyncIterable<string>;
}