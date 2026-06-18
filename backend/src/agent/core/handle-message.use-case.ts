import type {HandleMessageInputPort} from "@agent/port/in/handle-message.input-port.js";
import {HandleMessageCmd} from "@agent/port/in/handle-message.cmd.js";

export class HandleMessageUseCase implements HandleMessageInputPort {
    handle(cmd: HandleMessageCmd): Promise<string> {
        return Promise.resolve(`response to the prompt ${cmd.prompt}`);
    }

}