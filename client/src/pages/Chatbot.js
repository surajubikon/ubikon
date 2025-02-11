import React, { useState, useEffect } from "react";
import Lottie from 'react-lottie';
import axios from "axios";
import "./Chatbot.css";
import animation from '../animation.json'
import api, { baseURL } from "../API/api.url";
const socket = new WebSocket("ws://localhost:5000");

const Chatbot = () => {
  const [message, setMessage] = useState("");  // User's text message
  const [chatHistory, setChatHistory] = useState([]);  // Stores chat history
  const [isOpen, setIsOpen] = useState(false);  // Controls chat visibility
  const [isBotTyping, setIsBotTyping] = useState(false);  // Indicates if bot is typing

  const assistanceId = "asst_u111F1CLDj5cuo5EcnWsSb00"; // Pass this ID for the assistant

  const defaultOptions = {
    loop: true,
    autoplay: true, // Animation will play on loop
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // WebSocket and message handling
  useEffect(() => {
    socket.onopen = () => console.log("Connected to WebSocket Server");

    socket.onmessage = (event) => {
      setChatHistory((prev) => [...prev, { sender: "bot", text: event.data }]);
      setIsBotTyping(false);

      // Speech synthesis for bot replies
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(event.data);
      synth.speak(utterance);
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("WebSocket Disconnected");

    return () => socket.close();
  }, []);

  // Handle message sending
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    setMessage("");
    setIsBotTyping(true);

    try {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message); // Send via WebSocket if connected
      } else {
        const response = await axios.post(`${baseURL}${api.aiChat.sendMessage.url}`, { 
          message, 
          assistanceId 
        });
        setChatHistory((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
        setIsBotTyping(false);

        // Speech synthesis for bot replies
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response.data.reply);
        synth.speak(utterance);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false);
    }
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to record user audio (optional)
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          socket.send(audioUrl); // Send audio URL or the actual audio to the backend
        };

        mediaRecorder.start();

        // Stop recording after a few seconds
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000); // Stop after 5 seconds of recording
      })
      .catch((err) => console.error("Error recording audio:", err));
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-btn" onClick={toggleChat}>
        <Lottie options={defaultOptions} style={{ width: '100px', height: '100px' }} />
      </button>

      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">
            <h3>Ubikon AI Assistant</h3>
            <button className="close-chat" onClick={toggleChat}>✕</button>
          </div>

          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`message ${chat.sender}`}>
                <p>{chat.text}</p>
              </div>
            ))}
            {isBotTyping && (
              <div className="message bot typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="chat-input">
            <input type="text" value={message} onChange={handleMessageChange} />
            <button type="submit">Send</button>
          </form>

          <button onClick={startRecording}>Record Audio</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
