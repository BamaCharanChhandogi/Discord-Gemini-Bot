# Discord-Gemini-Bot

This is a Discord bot that utilizes the Gemini API to generate responses and images based on user input. The bot can engage in conversations, answer questions, and create images on the fly.

## Features

- **Conversation**: The bot can engage in natural conversations by understanding user input and providing relevant responses using the Gemini API.
- **Question Answering**: Users can ask the bot questions on various topics, and it will provide accurate answers by leveraging the Gemini API's knowledge base.
- **Image Generation**: The bot can generate images based on user prompts using the Gemini API's image generation capabilities.

## Prerequisites

Before running the bot, make sure you have the following:

- Python 3.6 or higher
- A Discord bot token (obtain one from the [Discord Developer Portal](https://discord.com/developers/applications))
- A Gemini API key (sign up for an account at [Gemini API](https://www.gemini.com/api))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/discord-gemini-bot.git
```

2. Navigate to the project directory:
```bash
cd discord-gemini-bot
```
3. Install the required dependencies:
```
npm i @google/generative-ai discord.js dotenv
```
4. Create a .env file in the project directory and add your Discord bot token and Gemini API key
```bash
DISCORD_BOT_TOKEN=your-discord-bot-token
GEMINI_API_KEY=your-gemini-api-key
```
# Usage
To run the bot, execute the following command:
```bash
npm start
```
The bot will start running and listening for commands in the Discord server it has been added to.

## Commands

- `!ask <question>`: Ask the bot a question, and it will provide an answer using the Gemini API.
- `!image <prompt>`: Generate an image based on the given prompt using the Gemini API's image generation capabilities.
- `!chat <message>`: Start a conversation with the bot by sending a message. The bot will respond accordingly.
--------------------------------------------

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENS).