// import axios from 'axios';

// const FIXED_ASSISTANCE_ID = 'asst_u111F1CLDj5cuo5EcnWsSb00'; // Fixed Assistant ID

// export const aiChatRoutes = async (req, res) => {
//   // Define the final assistance ID at the beginning
//   const { message, assistanceId } = req.body;
//   const finalAssistanceId = assistanceId || FIXED_ASSISTANCE_ID;

//   try {
//     console.log(`Received message (Assistance ID: ${finalAssistanceId}):`, message);

//     // Send request to OpenAI API with gpt-4o-mini model
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-4o-mini',
//         messages: [
//           { role: 'system', content: `assistant_id: ${finalAssistanceId}` },
//           { role: 'user', content: message },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log(`Response from OpenAI (Assistance ID: ${finalAssistanceId}):`, response.data);

//     // Return the reply with the assistance ID
//     res.json({
//       assistanceId: finalAssistanceId,
//       reply: response.data.choices[0].message.content,
//     });
//   } catch (error) {
//     // Log the full error for detailed troubleshooting
//     if (error.response) {
//       console.error('OpenAI API Error:', error.response.data);
//       res.status(500).json({
//         error: error.response.data.error.message || 'Something went wrong',
//         assistanceId: finalAssistanceId, // Return the assistance ID even on error
//       });
//     } else {
//       console.error('General Error:', error.message);
//       res.status(500).json({
//         error: 'Something went wrong',
//         assistanceId: finalAssistanceId,
//       });
//     }
//   }
// };



import axios from 'axios';

const FIXED_ASSISTANCE_ID = 'asst_u111F1CLDj5cuo5EcnWsSb00'; // Fixed Assistant ID
var assistantPrompt;

export async function getAssistant() {
    const url = `https://api.openai.com/v1/assistants/${FIXED_ASSISTANCE_ID}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2',
    };

    try {
        console.log("Fetching Assistant with ID:", FIXED_ASSISTANCE_ID);  // Logging the assistant ID

        const response = await axios.get(url, { headers });
        assistantPrompt=response.data['instructions'];
        console.log("Assistant data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        // Enhanced error handling
        if (error.response) {
            console.error(`Failed to fetch assistant ID: ${FIXED_ASSISTANCE_ID}`);
            console.error(`Status: ${error.response.status}`);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
            console.error('Request details:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        return null;
    }
}
export const aiChatRoutes = async (req, res) => {
  const { message, assistanceId } = req.body;
  // Determine final assistanceId, fallback to FIXED_ASSISTANCE_ID if not provided
  const finalAssistanceId = assistanceId || FIXED_ASSISTANCE_ID;

  await getAssistant();
  console.log("assistantPrompt:",assistantPrompt);
  try {
    console.log(`Received message (Assistance ID: ${finalAssistanceId}):`, message);

    // Build the system message with assistant-specific instructions
    const systemMessage = `You are a helpful assistant. Your assistance ID is: ${finalAssistanceId}.`;

    // Send request to OpenAI API with gpt-4o-mini model
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: assistantPrompt },
          { role: 'user', content: message }, // User's message
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Response from OpenAI (Assistance ID: ${finalAssistanceId}):`, response.data);

    // Return the reply with the assistance ID
    res.json({
      assistanceId: finalAssistanceId,
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    // Log the full error for detailed troubleshooting
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
      res.status(500).json({
        error: error.response.data.error.message || 'Something went wrong',
        assistanceId: finalAssistanceId, // Return the assistance ID even on error
      });
    } else {
      console.error('General Error:', error.message);
      res.status(500).json({
        error: 'Something went wrong',
        assistanceId: finalAssistanceId,
      });
    }
  }
};