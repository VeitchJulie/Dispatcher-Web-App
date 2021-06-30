import './App.css';
import Data from './Data'
import Map from './Map'

// body cant appear as a child of div
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2> Dispatcher App </h2>
      </header>
      <body className="grid"> 
        <div className="data-frame">
          <Data/>
        </div>
        <div className="map-frame"> 
          <Map/>
        </div>
      </body>
    </div>
  );
}

export default App;
