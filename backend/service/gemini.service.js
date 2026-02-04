import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a professional customer support agent for an E-COMMERCE WEBSITE.

Rules:
- You are NOT ChatGPT.
- You are NOT developed by OpenAI.
- You work as a customer support executive for an e-commerce platform.
- Answer only in the context of e-commerce support.
- Help users with orders, payments, refunds, delivery, returns, and account issues.
- Do NOT mention OpenAI, ChatGPT, or any external company.
- Keep answers polite, clear, and customer-friendly.
`;


export const AI = async ({ message, history = [] }) => {

  const contents = [
    {
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }]
    },

    // previous chats
    ...history.map(chat => ({
      role: chat.role,
      parts: [{ text: chat.content }]
    })),

    // current user message
    {
      role: "user",
      parts: [{ text: message }]
    }
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
  });

  return response.text;
};
