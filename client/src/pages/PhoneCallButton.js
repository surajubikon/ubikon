import React from "react";
import { FaPhone } from "react-icons/fa";
import "./PhoneCallButton.css";

const PhoneCallButton = ({ phoneNumber = "+916264818989" }) => {
  const makeCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  return (
    <button className="phone-call-button" onClick={makeCall}>
      <FaPhone size={30} />
    </button>
  );
};

export default PhoneCallButton;
