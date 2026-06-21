import {ChatMessage} from "@agent/domain/chat-message.js";
import {Chat} from "@agent/domain/chat.js";

export interface LoadChatPort {

    findChatById(chatId: string): Promise<Chat| null>;
}