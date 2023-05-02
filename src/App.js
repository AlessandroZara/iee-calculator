import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [category, setCategory] = useState(
    "1.Frigorifero con uno o piu' scomparti per la conservazione di alimenti freschi"
  ); // stato per la categoria dell'apparecchio
  const [volume, setVolume] = useState(""); // stato per il volume dell'apparecchio
  const [energy, setEnergy] = useState(""); // stato per l'energia annua consumata dall'apparecchio
  const [SAEc, setSAEc] = useState(""); // stato per il valore di SAEc
  const [IEE, setIEE] = useState(""); // stato per il valore del coefficiente IEE
  const [errorVolume, setErrorVolume] = useState(""); // stato per l'errore
  const [errorEnergy, setErrorEnergy] = useState(""); // stato per l'errore
  // Tabella dei valori di M ed N in base alla categoria dell'apparecchio
  const table = {
    "1.Frigorifero con uno o piu' scomparti per la conservazione di alimenti freschi":
      { M: 0.233, N: 245 },
    "2.Frigorifero con scomparto a temperatura moderata, apparecchio a temperatura moderata, cantinetta":
      { M: 0.233, N: 245 },
    "3.Raffreddatore e Frigorifero con scomparto a 0 Stelle": {
      M: 0.233,
      N: 245,
    },
    "4.Frigorifero con scomparto a 1 Stella": { M: 0.643, N: 191 },
    "5.Frigorifero con scomparto a 2 Stelle": { M: 0.45, N: 245 },
    "6.Frigorifero con scomparto a 3 Stelle": { M: 0.777, N: 303 },
    "7.Frigo-Congelatore": { M: 0.777, N: 303 },
    "8.Congelatore Verticale": { M: 0.539, N: 315 },
    "9.Congelatore a pozzetto": { M: 0.472, N: 286 },
  };

  // Funzione per il calcolo di SAEc
  const calculateSAEc = () => {
    if (volume === "") {
      setErrorVolume("inserisci un numero per il volume del prodotto");
      setSAEc("")
    } else {
      const Veq = volume; // converto il volume da stringa a numero
      const { M, N } = table[category]; // ottengo i valori di M ed N dalla tabella
      const CH = Veq > 15 ? 50 : 15; // calcolo il valore di CH in base al volume dell'apparecchio
      console.log(CH);
      const SAEc = Veq * M + N + CH; // calcolo il valore di SAEc
      setSAEc(SAEc); // aggiorno lo stato di SAEc
      console.log(Veq);
    }
  };

  // Funzione per il calcolo di IEE
  const calculateIEE = () => {
    if (energy === "") {
      setErrorEnergy("inserisci un numero espresso in KW/Anno");
      setIEE("")
    }
    const AEc = parseFloat(energy); // converto l'energia annua consumata da stringa a numero
    const IEE = (AEc / SAEc) * 100; // calcolo il valore di IEE
    setIEE(IEE); // aggiorno lo stato di IEE
  };

  useEffect(() => {
   const timeoutVolume= setTimeout(function () {
      setErrorVolume("");
      setErrorEnergy("");
    }, 3000);   
    return () => clearTimeout(timeoutVolume);
  }, [errorEnergy,errorVolume]);
  return (
    <div className="App-header">
      <h1>Calcolo del coefficiente IEE per i frigoriferi</h1>
      <div>
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="1.Frigorifero con uno o piu' scomparti per la conservazione di alimenti freschi">
            1.Frigorifero con uno o piu' scomparti per la conservazione di
            alimenti freschi
          </option>
          <option value="2.Frigorifero con scomparto a temperatura moderata, apparecchio a temperatura moderata, cantinetta">
            2.Frigorifero con scomparto a temperatura moderata, apparecchio a
            temperatura moderata, cantinetta
          </option>
          <option value="3.Raffreddatore e Frigorifero con scomparto a 0 Stelle">
            3.Raffreddatore e Frigorifero con scomparto a 0 Stelle
          </option>
          <option value="4.Frigorifero con scomparto a 1 Stella">
            4.Frigorifero con scomparto a 1 Stella
          </option>
          <option value="5.Frigorifero con scomparto a 2 Stelle">
            5.Frigorifero con scomparto a 2 Stelle
          </option>
          <option value="6.Frigorifero con scomparto a 3 Stelle">
            6.Frigorifero con scomparto a 3 Stelle
          </option>
          <option value="7.Frigo-Congelatore">7.Frigo-Congelatore</option>
          <option value="8.Congelatore Verticale">
            8.Congelatore Verticale
          </option>
          <option value="9.Congelatore a pozzetto">
            9.Congelatore a pozzetto
          </option>
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
        <button onClick={calculateSAEc}>Calcola SAEc</button>
      </div>
      <div >
          {SAEc ? (
            <p>Il coefficiente SAEc è: {SAEc}</p>
          ) : (
            <p style={{ color: "red" }}>{errorVolume}</p>
          )}
          </div>
      <div >

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
          <button onClick={calculateIEE}>Calcola</button>
        </div>
        <div>
          {IEE? (
            <p>Il coefficiente IEE è: {IEE}</p>
          ) : (
            <p style={{ color: "red" }}>{errorEnergy}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
