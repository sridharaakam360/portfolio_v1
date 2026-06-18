import Groq from "groq-sdk";

// Initialize Groq SDK
// Explicitly allow browser to use the secret.
// WARNING: In production, never expose API keys on the client-side.
// We are doing this purely for a frontend-only demo implementation.
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "fallback_key_if_needed",
  dangerouslyAllowBrowser: true,
});

export async function chatWithGroq(query: string, context: string, history: { role: 'user' | 'assistant', content: string }[]) {
  if (!import.meta.env.VITE_GROQ_API_KEY) {
    console.warn("VITE_GROQ_API_KEY is not defined. Things might not work.");
  }

  const systemMessage = `You are a helpful AI assistant residing on Sridhar JD's portfolio website. 
Your goal is to answer questions about Sridhar politely and concisely. 
Use the provided RAG Context to inform your answer. 
If the information is not in the Context, say you don't know, but encourage the user to reach out to Sridhar directly.
Do not hallucinate and do not mention that you found this in the text context. Answer naturally as if you simply know it.

=== Context ===
${context}
=== End Context ===`;

  // Construct message array
  const messages: any[] = [
    { role: "system", content: systemMessage },
    ...history.map(msg => ({ role: msg.role, content: msg.content })),
    { role: "user", content: query }
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile", // Versatile and powerful model for general purpose
      temperature: 0.1, // Keep it deterministic
      max_tokens: 500,
    });

    return chatCompletion.choices[0]?.message?.content || "Sorry, I could not generate a response.";
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "There was an error communicating with the intelligence backend. Please check if the Groq API key is set properly.";
  }
}
