import './styles/App.css';
import Data from './Data'
import Map from './Map'
import Operation from './Operation'
import { connect } from 'react-redux'
// import {useState} from 'react'
// import axios from 'axios'
import ambulanceIcon from './images/ambulance.png'
import React from 'react';

class App extends React.Component {

  componentDidMount(){
    // console.log(this.props.teamState.sendTeam)
    // this.props.dispatch(setSend())
    // console.log(this.props.teamState.sendTeam)
  }
  

  showTime = function(){
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

  // window.setInterval(function(){
  //   showTime()
  // }, 5000);


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={ambulanceIcon} alt='icon'/> 
            <div className='left'> Dispatcher App </div>   
          </div>
          {this.showTime()}
        </header>
        <div className="grid"> 
          <div className='map-box'> 
          <Map 
            visibleMarkers={true}
            position = {[52.229, 20.970]}
            zoom = {12}
          /> </div>
          <div className='data-box'> <Data /> </div>
          {this.props.teamState.sendTeam === true && 
          <div className='cover'> 
            <div className='operation-box' > 
              <Operation /> 
            </div>
          </div>
          }
        </div>
      </div>
    )}
}

const mapStateToProps = (state) => {
  return {
    // location: state.location,
    teamState: state.teamState
  }
}

export default connect(mapStateToProps)(App)
