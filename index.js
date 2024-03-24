import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';


dotenv.config();
const MODEL_NAME = process.env.MODEL_NAME;
const API_KEY = process.env.API_KEY;
const TOKEN =process.env.TOKEN;

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
// Image generation
const imageGenerator = async (promptText) => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'user-agent': 'chrome'
      },
      body: JSON.stringify({
        prompt: promptText,
        n: 1,
        size: '512x512'
      }),
    });
    const data = await response.json();
    const imageUrl = data.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (message) => {
  console.log(message.content);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const imageText = message.content.toLowerCase();
  if(imageText.includes("generate image")||imageText.includes("generate")) {
    const promptText = message.content.substring("generate image".length).trim();
    imageGenerator(promptText).then((imageUrl) => {
      message.reply(imageUrl);
    })
    .catch((error) => {
      console.error('Error generating image:', error);
    });
  } else {
    const userText = message.cleanContent;
    runChat(userText).then((response) => {
        message.reply(response);
    });
  }
});
client.login(TOKEN);