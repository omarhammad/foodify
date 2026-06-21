import {ChatMessage} from "@agent/domain/chat-message.js";

export interface Chat {
    id: string;
    chatMessages: ChatMessage[];
}