# Foodify Backend

The **Foodify Backend** project is an AI-powered recipe application backend built with TypeScript and Express. The goal is to let users chat with an AI assistant, ask for recipes for specific foods, receive guided responses, and eventually save generated recipes into a dedicated recipe module.

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Services](#services)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Contributors](#contributors)

---

## Overview
This project is being built as a modular backend for an AI recipe assistant. The intended flow is that a user chats with the bot, asks for a recipe, receives an AI-generated answer, and later the generated recipe can be stored and managed by the recipe module.

The current implementation covers the first step of that flow: a client sends a prompt to a chat session, the backend delegates the request to a configured AI provider, and the response is streamed back over SSE.

The architecture is designed to be easy to extend. New features can be added as independent modules using the same Ports & Adapters approach: controllers call use cases through inbound ports, and external systems are accessed through outbound ports.

---

## Key Features
- **Hexagonal Architecture**: Core use cases stay independent of Express, Ollama, Azure OpenAI, and other infrastructure.
- **Streaming AI Responses**: Chat replies are streamed to the client using Server-Sent Events.
- **Provider Abstraction**: The `ChatPort` interface allows switching between AI providers.
- **Ollama Support**: Local AI chat support for development.
- **Azure OpenAI Support**: Cloud AI chat support using the OpenAI SDK.
- **Runtime Validation**: Zod validates request bodies and environment configuration.
- **Containerization**: Docker Compose support for local services like Ollama and SQL Server.
- **pnpm-Based Build**: Simple scripts for development, build, and production start.
- **Recipe Module Foundation**: Recipe-related module structure is prepared for the next stage of development.

---

## Services
1. **Agent Service**:
   - Handles chat prompts from clients.
   - Streams AI responses back over SSE.
   - Uses Ollama or Azure OpenAI through a provider-agnostic port.
   - Current Endpoint: `POST /api/chat/{chatId}` to send a prompt and stream the reply.
   - Future Goal: Guide users toward structured recipe generation.

2. **Recipe Service**:
   - Planned module for saving and managing generated recipes.
   - Intended to follow the same Hexagonal Architecture structure.
   - Future Goal: Store recipes created through the chat flow.

3. **Common Service**:
   - Scaffolded for shared contracts, utilities, and configuration.
   - Intended to hold reusable code across future modules.

---

## Technologies Used
- **Backend**: Node.js, TypeScript, Express
- **AI Providers**: Ollama, Azure OpenAI
- **Validation**: Zod
- **Build Tool**: TypeScript compiler, tsc-alias
- **Package Manager**: pnpm
- **Containerization**: Docker Compose
- **Local Services**: Ollama, SQL Server

---

## Setup and Installation
### Prerequisites
- Node.js
- pnpm
- Docker
- Ollama model or Azure OpenAI credentials

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/omarhammad/foodify.git
   cd foodify/backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start local services:
   ```bash
   pnpm docker:up
   ```

4. Pull a local Ollama model:
   ```bash
   docker exec foodify-ollama ollama pull qwen3
   ```

5. Run the backend:
   ```bash
   pnpm dev
   ```

6. Build the project:
   ```bash
   pnpm build
   ```

The backend starts on `http://localhost:3000`.

---

## API Endpoints
### Agent Service
- `POST /api/chat/{chatId}`: Send a prompt to the AI agent and stream the response over SSE.

Request body:
```json
{
  "prompt": "Hi, how are you?"
}
```

Example SSE response:
```text
data: Hello

data: there
```

Test with curl:
```bash
curl -N -X POST http://localhost:3000/api/chat/123 \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"prompt":"Hi, how are you?"}'
```

### Recipe Service
- Planned endpoint area for recipe persistence and recipe management.

### Common Service
- Shared internal module; no public HTTP endpoints.

---

## License
This project is licensed under the ISC License.

---

## Contributors
- **Omar Hammad** 
---
