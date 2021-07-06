import './styles/App.css';
import Data from './Data'
import Map from './Map'

// body cant appear as a child of div
function App() {

  let showTime = function(){
    let showDate = new Date()
    return <div className='right'> 
      {showDate.getDate() + '.' + showDate.getMonth()+ '.' + showDate.getFullYear() + ' ' + showDate.getHours() + ':' + showDate.getMinutes()} 
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='left'> Dispatcher App   </div>
        {showTime()}
      </header>
      <body className="grid"> 
        <div className='map-box'> <Map /> </div>
        <div className='data-box'> <Data /> </div>
      </body>
    </div>
  );
}

export default App;
