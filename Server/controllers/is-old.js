import axios from "axios";

const FIXED_ASSISTANCE_ID = "asst_u111F1CLDj5cuo5EcnWsSb00"; // Fixed Assistant ID

// Function to fetch assistant details (if needed)
export const getAssistant = async () => {
    console.log("Fixed ID",FIXED_ASSISTANCE_ID)
    const url = `https://api.openai.com/v1/assistants/${FIXED_ASSISTANCE_ID}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2',
    };

    try {
        console.log(`Fetching assistant details for Assistance ID: ${FIXED_ASSISTANCE_ID}`); // Log URL being accessed
        const response = await axios.get(url, { headers });
        console.log('Fetched assistant:', response.data); // Log the assistant data
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch assistant ID: ${error.response?.status}`);
        console.error('Response body:', error.response?.data);
        return null;
    }
};

export const aiChatRoutes = async (req, res) => {
    console.log("Fixed Assistance ID:", FIXED_ASSISTANCE_ID);

    // Get message and assistanceId from the request body
    const { message, assistanceId } = req.body;

    // If no assistanceId is provided, use the fixed one
    const finalAssistanceId = assistanceId || FIXED_ASSISTANCE_ID;
    const finalPrompt = "You are a ubikon assistant, designed to help users interact effectively.";

    try {
        console.log(`Received message (Assistance ID: ${finalAssistanceId}):`, message);

        // Fetch assistant details before proceeding (optional)
        const assistantData = await getAssistant(finalAssistanceId, process.env.OPENAI_API_KEY);

        if (assistantData) {
            console.log(`Assistant details fetched successfully for ID: ${finalAssistanceId}`);
        } else {
            console.error("Failed to fetch assistant details.");
        }

        // Call OpenAI API with gpt-4o-mini model
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini", // Use your preferred OpenAI model
                messages: [
                    { role: "system", content: finalPrompt },  // System message for the prompt
                    { role: "user", content: message },       // User message
                ],
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(`Response from OpenAI (Assistance ID: ${finalAssistanceId}):`, response.data);

        // Send response back with the assistant's reply
        res.json({
            assistanceId: finalAssistanceId, // Send the assistanceId back in the response
            reply: response.data.choices[0].message.content, // Send the reply from OpenAI
        });
    } catch (error) {
        if (error.response) {
            console.error("OpenAI API Error:", error.response.data);
            res.status(500).json({
                error: error.response.data.error.message || "Something went wrong",
                assistanceId: finalAssistanceId, // Return the assistance ID even on error
            });
        } else {
            console.error("General Error:", error.message);
            res.status(500).json({
                error: "Something went wrong",
                assistanceId: finalAssistanceId, // Return the assistance ID on error
            });
        }
    }
};
