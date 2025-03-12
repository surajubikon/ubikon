const ReactIcon = () => {
    return (
      <svg
        viewBox="0 0 841.9 595.3"
        xmlns="http://www.w3.org/2000/svg"
        className="react-icon"
        width="100"
        height="100"
      >
        {/* React's 3 Orbit Ellipses */}
        <g fill="none" stroke="#61dafb" strokeWidth="20">
          <ellipse rx="200" ry="50" cx="420.9" cy="296.5" />
          <ellipse rx="200" ry="50" cx="420.9" cy="296.5" transform="rotate(60 420.9 296.5)" />
          <ellipse rx="200" ry="50" cx="420.9" cy="296.5" transform="rotate(-60 420.9 296.5)" />
        </g>
        {/* React's Center Circle */}
        <circle cx="420.9" cy="296.5" r="35" fill="#61dafb" />
      </svg>
    );
  };
  
  export default ReactIcon;
  