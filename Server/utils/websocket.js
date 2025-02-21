import { transcribeAudio, generateResponse, textToSpeech } from "../services/speechService.js";

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
 ws.on("message", async (message) => {
      try {
        const audioBuffer = Buffer.from(message);
      const userText = await transcribeAudio(audioBuffer);
       const botText = await generateResponse(userText);
const speechAudio = await textToSpeech(botText);
        ws.send(speechAudio);
      } catch (error) {
        console.error("❌ Error:", error.message);
      }
    });

    ws.on("close", () => {
     
    });
  });

  console.log("📡 WebSocket Server Running");
};
