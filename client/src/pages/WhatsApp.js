import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsApp.css";

const WhatsappButton = ({ phoneNumber = "+916264818989", message = "Hello! I'm looking for a mobile app and website development service." }) => {
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button className="whatsapp-button" onClick={openWhatsApp}>
      <FaWhatsapp size={30} />
    </button>
  );
};

export default WhatsappButton;