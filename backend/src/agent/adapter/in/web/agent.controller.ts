import {Router, Request, Response} from "express";

export class AgentController {
    public readonly router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.post("/:chatId", this.chatWithAgent);
    }

    private chatWithAgent = (req: Request, res: Response): void => {
        const chatId = req.params.chatId;
        const message = req.body.message;
        res.status(200).json({chatId, message});
    };
}