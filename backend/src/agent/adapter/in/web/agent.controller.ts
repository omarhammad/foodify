import {Router, Request, Response} from "express";
import {z} from "zod";
import {HandleMessageInputPort} from "@agent/port/in/handle-message.input-port.js";
import {ChatRequestBody, chatRequestBodySchema} from "@agent/adapter/in/web/request/chat-request-body.js";

export class AgentController {
    public readonly router: Router;
    private readonly handleMessageInputPort: HandleMessageInputPort

    constructor(handleMessageInputPort: HandleMessageInputPort) {
        this.router = Router();
        this.handleMessageInputPort = handleMessageInputPort;
        this.registerRoutes();

    }

    private registerRoutes(): void {
        this.router.post("/:chatId", this.chatWithAgent);
    }

    private chatWithAgent = async (
        req: Request<{ chatId: string }, unknown, ChatRequestBody>,
        res: Response
    ): Promise<void> => {

        const chatId = req.params.chatId;


        const result = chatRequestBodySchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({error: z.flattenError(result.error)});
            return;
        }
        const {prompt} = result.data;

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        try {
            for await (const chunk of this.handleMessageInputPort.handle({chatId: chatId, prompt: prompt})) {
                res.write(`data: ${chunk} \n\n`);
            }
            res.end();
        } catch (error) {
            res.write(`data: ${JSON.stringify({message: "Streaming failed"})}\n\n`);
            res.end();
        }

    };
}