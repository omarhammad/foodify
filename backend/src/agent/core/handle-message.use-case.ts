import type {HandleMessageInputPort} from "@agent/port/in/handle-message.input-port.js";
import {HandleMessageCmd} from "@agent/port/in/handle-message.cmd.js";
import {ChatPort} from "@agent/port/out /chat-port.js";
import {ChatMessage} from "@agent/domain/chat-message.js";

export class HandleMessageUseCase implements HandleMessageInputPort {

    private readonly chatPort: ChatPort

    constructor(chatPort: ChatPort) {
        this.chatPort = chatPort;
    }

    handle(cmd: HandleMessageCmd): AsyncIterable<string> {
        const messages: ChatMessage[] = [{role: "user", content: cmd.prompt}];
        return this.chatPort.chat(messages);

    }

}