import express from "express";
import {config} from "./config.js";
import {AgentController} from "@agent/adapter/in/web/agent.controller.js";

const app = express();
app.use(express.json());


const agentController = new AgentController();
app.use("/api/chat", agentController.router);   // AgentController => /api/chat

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});