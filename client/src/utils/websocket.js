const socket = new WebSocket("ws://localhost:5000");

socket.onopen = () => console.log("Connected to WebSocket");

socket.onclose = () => console.log("WebSocket Disconnected");

export default socket;
