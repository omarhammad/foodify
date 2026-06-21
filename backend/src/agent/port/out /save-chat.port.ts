import {ChatMessage} from "@agent/domain/chat-message.js";

export interface SaveChatPort {
    
    saveMessage(chatId: string, message: ChatMessage): Promise<void>;
}