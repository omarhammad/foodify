import {AzureOpenAI} from "openai";
import type {ChatCompletionMessageParam} from "openai/resources/chat/completions";
import type {ChatMessage} from "@agent/domain/chat-message.js";
import type {AzureOpenAiConfig} from "@agent/config/chat-provider.config.js";
import {ChatPort} from "@agent/port/out /chat-port.js";

export class AzureOpenAiChatAdapter implements ChatPort {

    private readonly client: AzureOpenAI;

    constructor(private readonly config: AzureOpenAiConfig) {
        this.client = new AzureOpenAI({
            endpoint: config.endpoint,
            apiKey: config.apiKey,
            deployment: config.deployment,
            apiVersion: config.apiVersion,
        });
    }

    async* chat(messages: ChatMessage[]): AsyncIterable<string> {

        const systemMessage: ChatMessage = {
            role: "system",
            content: "You are Foodify's recipe assistant. Your only job is to help users create recipes and answer cooking-related questions (ingredients, techniques, substitutions, portions, dietary adjustments).\n" +
                "\n" +
                "If a user asks anything unrelated to food, cooking, or recipes, politely decline: \"I can only help with recipes and cooking. What dish would you like to make?\" Do not answer off-topic questions. Brief greetings and thanks are fine to respond to naturally.\n" +
                "\n" +
                "Follow this flow:\n" +
                "1. Help the user develop their recipe conversationally. Ask about missing details (servings, dietary needs, available ingredients) one question at a time.\n" +
                "2. When the recipe seems complete, present it in readable form and ask exactly: \"Does this look good, or would you like to change anything?\"\n" +
                "3. ONLY after the user confirms (e.g. \"yes\", \"that's all\", \"looks good\"), respond with ONLY a JSON object and no other text, in exactly this format:\n" +
                "\n" +
                "{\n" +
                "  \"title\": \"string\",\n" +
                "  \"servings\": number,\n" +
                "  \"ingredients\": [{ \"name\": \"string\", \"quantity\": \"string\" }],\n" +
                "  \"steps\": [\"string\"]\n" +
                "}\n" +
                "\n" +
                "Do not include the JSON until the user has confirmed. Do not wrap it in markdown code fences. Do not add any text before or after the JSON."

        };

        const stream = await this.client.chat.completions.create({
            model: this.config.deployment,
            messages: [systemMessage, ...messages] as ChatCompletionMessageParam[],
            stream: true
        });

        for await (const part of stream) {
            const content = part.choices[0]?.delta?.content;
            if (content) {
                yield content;
            }
        }
    }
}