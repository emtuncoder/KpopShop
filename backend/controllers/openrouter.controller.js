import { faqSamples } from "../faqsamples.js"; // or from DB
  
export const chatWithOpenRouter = async (req, res) => {
  try {
    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase();

    // Step 1: Try matching with sample answers
    const matched = faqSamples.find(sample =>
      sample.keywords.some(keyword => lastMessage.includes(keyword))
    );

    if (matched) {
      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: matched.answer,
            },
          },
        ],
      });
    }

    // Step 2: Fallback to OpenRouter AI
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ safe model
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:2004", // your frontend domain
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Chatbox Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
};
