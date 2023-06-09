import React from "react";
import "./App.css"
function ReferenceNumbers() {
  return (
    <div className="reference-numbers">
      <div className="reference-numbers">
        <span>0</span>
        <span style={{ paddingLeft: "30%" }}>30</span>
        <span style={{ paddingLeft: "5%" }}>40</span>
        <span style={{ paddingLeft: "5%" }}>50</span>
        <span style={{ paddingLeft: "5%" }}>60</span>
        <span style={{ paddingLeft: "5%" }}>70</span>
        <span style={{ paddingLeft: "25%" }}>100</span>
      </div>
    </div>
  );
}

function ProgressBar({ value, minValue, maxValue }) {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const getColor = () => {
    switch (true) {
      case percentage <= 30:
        return "green"; // Colore verde per valori inferiori o uguali a 30
      case percentage > 61:
        return "red"; // Colore rosso per valori superiori o uguali a 70
      case percentage > 30 && percentage <= 40:
        return "orange"; // Colore Arancione per valori compresi tra 30 e 40
      case percentage > 41 && percentage <= 50:
        return "blue"; // Colore Blue per valori compresi tra 30 e 40
      case percentage > 51 && percentage <= 60:
        return "violet"; // Colore Viola per valori compresi tra 30 e 40
      default:
        
        return "grey"; // Colore predefinito 
    }
  };

  const barStyle = {
    width: `${percentage}%`,
    backgroundColor: getColor(),
  };

  const classEnergy = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  function getClass() {
    switch (true) {
      case percentage <= 30:
        return classEnergy[0];
      case percentage > 61:
        return classEnergy[6];
      case percentage > 30 && percentage <= 40:
        return classEnergy[1];
      case percentage > 41 && percentage <= 50:
        return classEnergy[2];
      case percentage > 51 && percentage <= 60:
        return classEnergy[3];
      default:
       
        return "grey"; // Colore predefinito 
    }
  }
  return (
    <div className="progress-bar">
      <div className="progress-bar__bar" style={barStyle}></div>
      <div className="progress-bar__cursor"></div>
      <ReferenceNumbers minValue={minValue} maxValue={maxValue} />
      <br />
      <p style={{ fontSize: "24px ", color: "#FF9900" }}>
        Il prodotto è in classe: {getClass()}{" "}
      </p>
    </div>
  );
}

export default ProgressBar;
