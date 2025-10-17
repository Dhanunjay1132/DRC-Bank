import React, { useState } from "react";

const ChatBoat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "AIzaSyB-KGrJkqibG2dij1Oj7vkXzv_YxeqFXP4"; // Replace with your actual Gemini key

 const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: input }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      ?.join(" ") || "No valid response from Gemini.";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply },
    ]);
  } catch (err) {
    console.error("Gemini API error:", err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Error talking to Gemini." },
    ]);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="whitespace-pre-wrap">
            <strong className="capitalize">{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 rounded border text-white"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBoat;
