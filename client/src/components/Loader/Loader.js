import React from "react";
import { useLoader } from "../../context/LoaderContext"; // Loader context import

const Loader = () => {
  const { loading } = useLoader(); // Global loading state access karo

  if (!loading) return null; // Agar loading false hai toh kuch bhi show na ho

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
