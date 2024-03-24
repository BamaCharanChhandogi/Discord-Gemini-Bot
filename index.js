import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyD8Jgd-lGnC0883Z3lL6qFiz6iz7i7-VC0";
const TOKEN ="MTIyMTE4NzkyNTkyOTM2NTU0NA.GCTxcW.6QUzi-QGSquOF4VhD0Ao0yKSe77KIiUiLPU1Qo";

async function runChat(userPrompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };
  const safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
  ]
  const chat = model.startChat({
    generationConfig,
    safety_settings,
    history: [
      {
        role: "user",
        parts: [{ text: "hi" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello, how can I assist you today?" }],
      },
    ],
  });

  const result = await chat.sendMessage( `${userPrompt}` );
  const response = result.response;
  return response.text();
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (message) => {
  console.log(message.content);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const userText = message.cleanContent;
    runChat(userText).then((response) => {
        message.reply(response);
    });
});
client.login(TOKEN);
