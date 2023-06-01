import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import "./App.css";

function App() {
  const [category, setCategory] = useState("1.Frigorifero Verticale"); // stato per la categoria dell'apparecchio
  const [volume, setVolume] = useState(""); // stato per il volume dell'apparecchio
  const [energy, setEnergy] = useState(""); // stato per l'energia annua consumata dall'apparecchio
  const [SAEc, setSAEc] = useState(""); // stato per il valore di SAEc
  const [IEE, setIEE] = useState(""); // stato per il valore del coefficiente IEE
  const [errorVolume, setErrorVolume] = useState(""); // stato per l'errore
  const [errorEnergy, setErrorEnergy] = useState(""); // stato per l'errore
  // Tabella dei valori di M ed N in base alla categoria dell'apparecchio
  const table = {
    "1.Frigorifero Verticale": { M: 1.643, N: 609 },
    "2.Congelatore Verticale": { M: 4.928, N: 1472 },
    "3.Tavolo Refrigerato": { M: 2.555, N: 1790 },
    "4.Tavolo Congelatore": { M: 5.84, N: 2380 },
  };

  // Funzione per il calcolo di SAEc
  const calculateSAEc = () => {
    if (volume === "") {
      setErrorVolume("inserisci un numero per il volume del prodotto");
      setSAEc("");
    } else {
      const Veq = volume; // converto il volume da stringa a numero
      const { M, N } = table[category]; // ottengo i valori di M ed N dalla tabella
      const CH = Veq > 15 ? 50 : 15; // calcolo il valore di CH in base al volume dell'apparecchio
      console.log(CH);
      const SAEc = Math.round(Veq * M + N); // calcolo il valore di SAEc
      setSAEc(SAEc); // aggiorno lo stato di SAEc
      console.log(Veq);
    }
  };

  // Funzione per il calcolo di IEE
  const calculateIEE = () => {
    if (energy === "") {
      setErrorEnergy("inserisci un numero espresso in KW/Anno");
      setIEE("");
    } else if (SAEc === "") {
      setErrorEnergy(
        "Devi calcolare prima il SAEC, schiaccia il tasto 'calcola SAEc' se non lo hai cliccato"
      );
      setIEE("");
    } else {
      const AEc = parseFloat(energy); // converto l'energia annua consumata da stringa a numero
      const IEE = Math.round((AEc / SAEc) * 100); // calcolo il valore di IEE
      setIEE(IEE); // aggiorno lo stato di IEE
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
      <h1>Calcolo del coefficiente IEE per i frigoriferi</h1>
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
        <label htmlFor="volume">Volume (litri):</label>
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
            <><p>Il coefficiente IEE è: {IEE}</p>
            <ProgressBar value={IEE} minValue={minValue} maxValue={maxValue} /></>
          ) : (
            <p style={{ color: "red" }}>{errorEnergy}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
