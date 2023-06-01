import React from "react";

function ReferenceNumbers({ minValue, maxValue }) {
      
    return (
      <div className="reference-numbers">
        <div className="reference-numbers">
       <span >0</span>
       <span style={{paddingLeft:"30%"}}>30</span>
       <span style={{paddingLeft:"5%"}}>40</span>
       <span style={{paddingLeft:"5%"}}>50</span>
       <span style={{paddingLeft:"5%"}}>60</span>
       <span style={{paddingLeft:"5%"}}>70</span>
       <span style={{paddingLeft:"25%"}}>100</span>
    </div>
      </div>
    );
  }
  
  
function ProgressBar({ value, minValue, maxValue }) {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  console.log(percentage);
  const getColor = () => {
    switch (true) {
      case percentage <= 30:
        return "green"; // Colore verde per valori inferiori o uguali a 30
      case percentage > 61:
        return "red"; // Colore rosso per valori superiori o uguali a 70
      case percentage > 30 && percentage <= 40:
        return "orange";
      case percentage > 41 && percentage <= 50:
        return "blue";
        case percentage > 51 && percentage <= 60:
        return "violet";
      default:
        // Aggiungi altri casi per gestire gli intervalli desiderati
        return "grey"; // Colore predefinito per gli intervalli non gestiti
    }
  };

  const barStyle = {
    width: `${percentage}%`,
    backgroundColor: getColor(),
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__bar" style={barStyle}></div>
      <div className="progress-bar__cursor"></div>
      <ReferenceNumbers minValue={minValue} maxValue={maxValue} />
    </div>
  );
}

export default ProgressBar;
