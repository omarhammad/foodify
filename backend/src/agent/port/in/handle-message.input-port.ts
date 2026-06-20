import {HandleMessageCmd} from "@agent/port/in/handle-message.cmd.js";

export interface HandleMessageInputPort {
    handle(cmd: HandleMessageCmd): AsyncIterable<string>;
}