import React, { useState, useEffect } from "react";
import Lottie from 'react-lottie';
import axios from "axios";
import "./Chatbot.css";
import animation from '../animation.json';
import api, { baseURL } from "../API/api.url";
const socket = new WebSocket("ws://localhost:5000");

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const assistanceId = "asst_u111F1CLDj5cuo5EcnWsSb00";

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    socket.onopen = () => console.log("Connected to WebSocket Server");

    socket.onmessage = (event) => {
      setChatHistory((prev) => [...prev, { sender: "bot", text: event.data }]);
      setIsBotTyping(false);
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("WebSocket Disconnected");

    return () => socket.close();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    setMessage("");
    setIsBotTyping(true);

    try {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        const response = await axios.post(`${baseURL}${api.aiChat.sendMessage.url}`, {
          message,
          assistanceId
        });
        setChatHistory((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
        setIsBotTyping(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-btn" onClick={toggleChat}>
        <Lottie options={defaultOptions} style={{ width: '160px', height: '100px' }} />
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
        </div>
      )}
    </div>
  );
};

export default Chatbot;