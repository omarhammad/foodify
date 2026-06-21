import {MessageRole} from "@agent/domain/message-role.js";

export interface ChatMessage {
    role: MessageRole;
    content: string;
}