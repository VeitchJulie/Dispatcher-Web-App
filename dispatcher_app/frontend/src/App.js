import './styles/App.css';
import Data from './Data'
import Map from './Map'
// import {useState} from 'react'
// import axios from 'axios'

function App() {

  let showTime = function(){
    let showDate = new Date()
    return <div className='right'> 
      {showDate.getDate() + '.' + (showDate.getMonth()+ 1 ) + '.' + showDate.getFullYear() + ' ' + showDate.getHours() + ':' + showDate.getMinutes()} 
    </div>
  }

  // za często się pobiera
  // const [teams, setTeams] = useState([]);
  // axios.get('http://localhost:8000/teams/?format=json').then((response) => {
  // setTeams(response.data)
  // })

  window.setInterval(function(){
    showTime()
  }, 5000);

  return (
    <div className="App">
      <header className="App-header">
        <div className='left'> Dispatcher App   </div>
        {showTime()}
      </header>
      <div className="grid"> 
        <div className='map-box'> <Map /> </div>
        <div className='data-box'> <Data /> </div>
      </div>
    </div>
  );
}

export default App;
