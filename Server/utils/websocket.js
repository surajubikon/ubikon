import { transcribeAudio, generateResponse, textToSpeech } from "../services/speechService.js";

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("🔗 Client Connected");

    ws.on("message", async (message) => {
      try {
        const audioBuffer = Buffer.from(message);
        console.log("🎤 Received audio from client");

        // Step 1: Convert Audio to Text (Speech-to-Text)
        const userText = await transcribeAudio(audioBuffer);
        console.log("📜 Transcribed Text:", userText);

        // Step 2: Get Response from GPT-4o
        const botText = await generateResponse(userText);
        console.log("🤖 GPT-4 Response:", botText);

        // Step 3: Convert Text to Speech
        const speechAudio = await textToSpeech(botText);

        // Step 4: Send Back Audio Response
        ws.send(speechAudio);
      } catch (error) {
        console.error("❌ Error:", error.message);
      }
    });

    ws.on("close", () => {
      console.log("❌ Client Disconnected");
    });
  });

  console.log("📡 WebSocket Server Running");
};
