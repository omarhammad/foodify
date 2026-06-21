import {LoadChatPort} from "@agent/port/out /load-chat.port.js";
import {SaveChatPort} from "@agent/port/out /save-chat.port.js";
import {ChatMessage} from "@agent/domain/chat-message.js";
import {Chat} from "@agent/domain/chat.js";
import {prisma} from "@common/persistence/prisma.client.js";
import {MessageRole} from "@agent/domain/message-role.js";


export class ChatMemoryAdapter implements LoadChatPort, SaveChatPort {


    async findChatById(chatId: string): Promise<Chat | null> {

        const row = await prisma.chatEntity.findUnique({
            where: {id: chatId},
            include: {
                messages: {orderBy: {createdAt: "asc"}}
            }
        })
        return row ?
            {
                id: row.id,
                chatMessages: row.messages.map((m: any) => ({
                    role: m.role as MessageRole,
                    content: m.content,
                })),
            }
            : null;
    }

    async saveMessage(chatId: string, message: ChatMessage): Promise<void> {
        await prisma.chatEntity.upsert({
            where: {id: chatId},
            update: {
                messages: {create: {role: message.role, content: message.content}},
            },
            create: {
                id: chatId,
                messages: {create: {role: message.role, content: message.content}},
            },
        });
    }


}