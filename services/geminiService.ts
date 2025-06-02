
import { GoogleGenAI, Chat } from "@google/genai"; // Use direct import

// Ensure API_KEY is available in the environment
// In a real build process, process.env.API_KEY would be substituted.
// For client-side, this usually comes from a backend or a secure config.
// For this example, we assume it's directly available as per instructions.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY for Gemini is not set. Chatbot functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "YOUR_API_KEY_PLACEHOLDER" }); // Provide placeholder if not set

let chatSession: Chat | null = null;

async function getChatInstance(): Promise<Chat> {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: "You are a friendly and helpful support assistant for Hoang Long Giang (HLG) company employees. Provide concise answers to questions about company policies, internal system usage (like this HLG Workplace), and general IT support. If you don't know an answer, politely say so and suggest contacting IT support directly.",
        // Omit thinkingConfig to use default (enabled) for higher quality.
      },
      // history: [] // Can be used to load prior conversation history
    });
  }
  return chatSession;
}

export async function callGeminiApi(prompt: string, chatId?: string): Promise<string> {
  if (!apiKey) {
    return "API Key not configured. Cannot connect to AI assistant.";
  }

  try {
    const chat = await getChatInstance(); // Use shared chat session
    const result = await chat.sendMessage({ message: prompt });
    
    // Accessing the text response directly
    const textResponse = result.text;
    if (typeof textResponse === 'string') {
      return textResponse;
    } else {
      // This case should ideally not happen with .text property
      console.error("Unexpected response format from Gemini:", result);
      return "Sorry, I received an unusual response. Please try again.";
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Check for specific error types if needed
    if (error instanceof Error && error.message.includes("API key not valid")) {
        return "There's an issue with the API configuration. Please contact support.";
    }
    return "Sorry, I'm having trouble understanding that. Could you try rephrasing?";
  }
}

// Optional: Function to re-initialize or clear chat session
export function resetChatSession(): void {
  chatSession = null;
}

