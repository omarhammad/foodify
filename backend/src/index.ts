import express from "express";
import {config} from "./config.js";
import {AgentController} from "@agent/adapter/in/web/agent.controller.js";
import {HandleMessageUseCase} from "@agent/core/handle-message.use-case.js";
import {agentConfig} from "@agent/config/agent.config.js";
import {createChatAdapter} from "@agent/adapter/out/chat-agents/chat-adapter.factory.js";
import {ChatMemoryAdapter} from "@agent/adapter/out/prisma-repo/chat-memory-adapter.js";

const app = express();
app.use(express.json());


// AgentController => /api/chat
const chatPort = createChatAdapter(agentConfig);
const agentController = new AgentController(
    new HandleMessageUseCase(
        chatPort,
        new ChatMemoryAdapter(),
        new ChatMemoryAdapter()
    )
);
app.use("/api/chat", agentController.router);

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});