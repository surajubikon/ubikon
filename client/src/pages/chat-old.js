// import React, { useState } from 'react';
// import axios from 'axios';
// import './Chatbot.css';  // Import the CSS for styles

// const Chatbot = () => {
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isOpen, setIsOpen] = useState(false); // State to handle chat visibility
//   const [isBotTyping, setIsBotTyping] = useState(false); // State to handle bot typing indicator

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     if (!message) return;

//     // Update chat history with user message
//     const newMessage = { sender: 'user', text: message };
//     setChatHistory([...chatHistory, newMessage]);

//     try {
//       setMessage(''); 
//       setIsBotTyping(true); 

      
//       const response = await axios.post('https://ubikon.in/api/aichat/board', { message });

      
//       setTimeout(() => {
//         // Update chat history with bot response
//         const botReply = { sender: 'bot', text: response.data.reply };
//         setChatHistory((prev) => [...prev, botReply]);
//         setIsBotTyping(false); // Hide typing indicator
//       }, 1000); // Adjust delay as needed
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setIsBotTyping(false); // Hide typing indicator in case of error
//     }
//   };

//   // Toggle chat visibility
//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="chatbot-container">
//       {/* Floating chat button */}
//       {!isOpen && (
//         <button className="chatbot-btn" onClick={toggleChat}>
//           <span role="img" aria-label="chat-icon">💬</span>
//         </button>
//       )}

//       {/* Chat interface */}
//       {isOpen && (
//         <div className="chatbot">
//           <div className="chat-header">
//             <h3>AI Assistant With UBIKON </h3>
//             <button className="close-chat" onClick={toggleChat}>
//               ✕
//             </button>
//           </div>

//           <div className="chat-history">
//             {chatHistory.map((chat, index) => (
//               <div key={index} className={`message ${chat.sender}`}>
//                 <p>{chat.text}</p>
//               </div>
//             ))}
//             {isBotTyping && (
//               <div className="message bot typing-indicator">
//                 <span>.</span>
//                 <span>.</span>
//                 <span>.</span>
//               </div>
//             )}
//           </div>

//           <form onSubmit={sendMessage} className="chat-input">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={message}
//               onChange={handleMessageChange}
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;


/// new


// import React, { useState, useEffect } from "react";
// import Lottie from 'react-lottie';
// import axios from "axios";
// import "./Chatbot.css";
// import animation from '../animation.json'
// const socket = new WebSocket("ws://localhost:5000");

// const Chatbot = () => {
//   const [message, setMessage] = useState("");  // User's text message
//   const [chatHistory, setChatHistory] = useState([]);  // Stores chat history
//   const [isOpen, setIsOpen] = useState(false);  // Controls chat visibility
//   const [isBotTyping, setIsBotTyping] = useState(false);  // Indicates if bot is typing

//   const assistanceId = "asst_u111F1CLDj5cuo5EcnWsSb00"; // Pass this ID for the assistant
 
//   const defaultOptions = {
//     loop: true,
//     autoplay: true, // Animation will play on loop
//     animationData: animation,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };
//   // WebSocket and message handling
//   useEffect(() => {
//     socket.onopen = () => console.log("Connected to WebSocket Server");

//     socket.onmessage = (event) => {
//       setChatHistory((prev) => [...prev, { sender: "bot", text: event.data }]);
//       setIsBotTyping(false);
//       // Commented out the speech synthesis part
//       // const synth = window.speechSynthesis;
//       // const utterance = new SpeechSynthesisUtterance(event.data);
//       // synth.speak(utterance);
//     };

//     socket.onerror = (error) => console.error("WebSocket Error:", error);
//     socket.onclose = () => console.log("WebSocket Disconnected");

//     return () => socket.close();
//   }, []);

//   // Handle message sending
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     setChatHistory([...chatHistory, { sender: "user", text: message }]);
//     setMessage("");
//     setIsBotTyping(true);

//     try {
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.send(message); // Send via WebSocket if connected
//       } else {
//         const response = await axios.post("https://ubikon.in/api/aichat/bot", { 
//           message, 
//           assistanceId 
//         });
//         setChatHistory((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
//         setIsBotTyping(false);

//         // Commented out the speech synthesis part
//         // const synth = window.speechSynthesis;
//         // const utterance = new SpeechSynthesisUtterance(response.data.reply);
//         // synth.speak(utterance);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setIsBotTyping(false);
//     }
//   };

//   // Toggle chat visibility
//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle message input change
//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   return (
//     <div className="chatbot-container">
//       {/* Chat toggle button */}
//       <button className="chatbot-btn" onClick={toggleChat}>
//           <Lottie options={defaultOptions} style={{ width: '100px', height: '50px' }} />
//         </button>    
//       {isOpen && (
//         <div className="chatbot">
//           <div className="chat-header">
//             <h3>Ubikon AI Assistant</h3>
//             <button className="close-chat" onClick={toggleChat}>✕</button>
//           </div>

//           {/* Chat history */}
//           <div className="chat-history">
//             {chatHistory.map((chat, index) => (
//               <div key={index} className={`message ${chat.sender}`}>
//                 <p>{chat.text}</p>
//               </div>
//             ))}
//             {isBotTyping && (
//               <div className="message bot typing-indicator">
//                 <span>.</span><span>.</span><span>.</span>
//               </div>
//             )}
//           </div>

//           {/* Message input form */}
//           <form onSubmit={sendMessage} className="chat-input">
//             <input type="text" value={message} onChange={handleMessageChange} />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
