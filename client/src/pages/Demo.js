import React, { useState } from "react";

const ToggleSection = () => {
  const [sidebarmenu, setActive] = useState(false); // State for Toggle

  return (
    <div>
      {/* Button to Toggle Class */}
      <button className="btn btn-primary" onClick={() => setActive(!sidebarmenu)}>
        add
      </button>

      {/* Section Jisme Class Add/Remove Hogi */}
      <section className={`content-box ${sidebarmenu ? "active" : ""}`}>
      <button className="btn btn-primary" onClick={() => setActive(!sidebarmenu)}>
        Remove      </button>
        <h2>Class Toggle Example</h2>
        <p>Button click karne par class add/remove hogi.</p>
      </section>
    </div>
  );
};

export default ToggleSection;
