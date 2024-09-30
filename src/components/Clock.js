import React, { useState, useEffect } from "react";
import "../style/global.scss";

const Clock = () => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const backgroundStyle = {
    height: "10vh",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5rem",
    background: "black",
    backgroundSize: "cover",
    color: "white",
    // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  };

  return (
    <div style={backgroundStyle}>
      <div>{currentTime}</div>
    </div>
  );
};

export { Clock };
