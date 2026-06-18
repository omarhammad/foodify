import {Router, Request, Response} from "express";
import {HandleMessageInputPort} from "@agent/port/in/handle-message.input-port.js";
import {HandleMessageUseCase} from "@agent/core/handle-message.use-case.js";
import {ChatRequestBody} from "@agent/adapter/in/web/request/chat-request-body.js";

export class AgentController {
    public readonly router: Router;
    private readonly handleMessageInputPort: HandleMessageInputPort

    constructor() {
        this.router = Router();
        this.registerRoutes();
        this.handleMessageInputPort = new HandleMessageUseCase()
    }

    private registerRoutes(): void {
        this.router.post("/:chatId", this.chatWithAgent);
    }

    private chatWithAgent = async (
        req: Request<{ chatId: string }, unknown, ChatRequestBody>,
        res: Response
    ): Promise<void> => {

        const chatId = req.params.chatId;
        const {prompt} = req.body;

        const message = await this.handleMessageInputPort.handle({chatId: chatId, prompt: prompt});

        res.status(200).json({chatId, message});
    };
}