import React from "react";
import Snowfall from "react-snowfall";

const Home = () => {
  return (
    <div style={{ background: "ghostwhite", position: "relative", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "red", textAlign: "center" }}>Happy new year! 🎉🎉🎉</h1>
      <Snowfall snowflakeCount={1000} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
    </div>
  );
};

export default Home;
