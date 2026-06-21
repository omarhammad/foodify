import type {HandleMessageInputPort} from "@agent/port/in/handle-message.input-port.js";
import {HandleMessageCmd} from "@agent/port/in/handle-message.cmd.js";
import {ChatPort} from "@agent/port/out /chat-port.js";
import {ChatMessage} from "@agent/domain/chat-message.js";
import {LoadChatPort} from "@agent/port/out /load-chat.port.js";
import {SaveChatPort} from "@agent/port/out /save-chat.port.js";

export class HandleMessageUseCase implements HandleMessageInputPort {


    constructor(
        private readonly chatPort: ChatPort,
        private readonly loadChatPort: LoadChatPort,
        private readonly saveChatPort: SaveChatPort) {
    }

    async* handle(cmd: HandleMessageCmd): AsyncIterable<string> {
        const chat = await this.loadChatPort.findChatById(cmd.chatId);

        const history: ChatMessage[] = chat?.chatMessages ?? [];
        const userMessage: ChatMessage = {role: "user", content: cmd.prompt};

        await this.saveChatPort.saveMessage(cmd.chatId, userMessage);


        const messages: ChatMessage[] = [...history, userMessage];

        let assistantContent = "";

        for await (const chunk of this.chatPort.chat(messages)) {
            assistantContent += chunk;
            yield chunk;
        }

        await this.saveChatPort.saveMessage(
            cmd.chatId,
            {role: "assistant", content: assistantContent}
        )
    }

}