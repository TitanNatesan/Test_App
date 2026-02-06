
import { GoogleGenAI, Type } from "@google/genai";
import { ResearcherInfo } from "../types";

export const getResearcherSpotlight = async (topic: string): Promise<ResearcherInfo> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a profile preview for a real, notable researcher in the field of ${topic}. Focus on their professional identity.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          institution: { type: Type.STRING },
          currentFocus: { type: Type.STRING },
          bio: { type: Type.STRING, description: "A one-sentence professional biography." },
        },
        required: ["name", "institution", "currentFocus", "bio"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as ResearcherInfo;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {
      name: "Dr. Elena Rossi",
      institution: "European University Institute",
      currentFocus: "Transnational Climate Governance",
      bio: "An expert in environmental policy focusing on how non-state actors influence global climate standards."
    };
  }
};
