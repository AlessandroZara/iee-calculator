import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import "./App.css";

function App() {
  const [category, setCategory] = useState("1.Frigorifero Verticale");
  const [volume, setVolume] = useState("");
  const [energy, setEnergy] = useState(""); // Stato per l'energia annua consumata (kWh/anno)
  const [SAEc, setSAEc] = useState("");
  const [IEE, setIEE] = useState("");
  const [errorVolume, setErrorVolume] = useState("");
  const [errorEnergy, setErrorEnergy] = useState("");
  const table = {
    "1.Frigorifero Verticale": { M: 1.643, N: 609 },
    "2.Congelatore Verticale": { M: 4.928, N: 1472 },
    "3.Tavolo Refrigerato": { M: 2.555, N: 1790 },
    "4.Tavolo Congelatore": { M: 5.840, N: 2380 },
  };
  const calculateSAEc = () => {
    if (volume === "") {
      setErrorVolume("Inserisci un numero per il volume del prodotto");
      setSAEc("");
    } else {
      const Veq = parseFloat(volume);
      const { M, N } = table[category];
      const SAEcValue = Math.round(Veq * M + N);
      setSAEc(SAEcValue);
    }
  };

  const calculateIEE = () => {
    if (energy === "") {
      setErrorEnergy("Inserisci un numero per l'energia consumata in kWh/Anno");
      setIEE("");
    } else if (SAEc === "") {
      setErrorEnergy(
        "Devi calcolare prima il SAEC, schiaccia il tasto 'calcola SAEc'"
      );
      setIEE("");
    } else {
      const AEc = parseFloat(energy); // L'energia inserita è già annua
      const IEEValue = Math.round((AEc / SAEc) * 100);
      setIEE(IEEValue);
    }
  };

  const ResetAll = () => {
    setCategory("1.Frigorifero Verticale");
    setVolume("");
    setEnergy("");
    setIEE("");
    setSAEc("");
  };

  useEffect(() => {
    const timeoutVolume = setTimeout(function () {
      setErrorVolume("");
      setErrorEnergy("");
    }, 3000);
    return () => clearTimeout(timeoutVolume);
  }, [errorEnergy, errorVolume]);

  const minValue = 0;
  const maxValue = 100;

  return (
    <div className="App-header">
      <h1>Calcolo del coefficiente IEE per frigoriferi professionali</h1>
      <div id="container-category">
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="1.Frigorifero Verticale">
            1.Frigorifero Verticale
          </option>
          <option value="2.Congelatore Verticale">
            2.Congelatore Verticale
          </option>
          <option value="3.Tavolo Refrigerato">3.Tavolo Refrigerato</option>
          <option value="4.Tavolo Congelatore">4.Tavolo Congelatore</option>
        </select>
      </div>
      <div>
        <label htmlFor="volume">Volume netto (litri):</label>
        <input
          type="text"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <button id="Saec" onClick={calculateSAEc}>
          Calcola SAEc
        </button>
      </div>
      <div>
        {SAEc ? (
          <p>Il coefficiente SAEc è: {SAEc}</p>
        ) : (
          <p style={{ color: "red" }}>{errorVolume}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="energy">Energia annua consumata (kWh/Anno):</label>
          <input
            id="energy"
            type="number"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          />
        </div>
        <div>
          <button id="calculate-iee" onClick={calculateIEE}>
            Calcola IEE
          </button>
          <button id="reset" onClick={ResetAll}>
            Reset
          </button>
        </div>
        <div>
          {IEE ? (
            <>
              <p>Il coefficiente IEE è: {IEE}</p>
              <ProgressBar value={IEE} minValue={minValue} maxValue={maxValue} />
            </>
          ) : (
            <p style={{ color: "red" }}>{errorEnergy}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;