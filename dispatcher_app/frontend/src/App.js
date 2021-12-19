import './styles/App.css';
import Data from './Data'
import Map from './Map'
import Operation from './Operation'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import React from 'react';

class App extends React.Component {

  state = {
    optionsBoxVisible: false
  }

  onOptionsClick(){
    this.setState({optionsBoxVisible: true})
  }

  handleClose(){
    this.setState({optionsBoxVisible: false})
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div className='left'> Dispatcher App </div>   
          </div>
          <div className="menu">
            {/* <button className="menu-button" onClick={() => this.onOptionsClick()}> Options </button> */}
            <Link to="/past"> <button className="menu-button"> Past Cases </button> </Link>  
            <Link to="CreateCase"> <button className="menu-button"> Create a new Case </button></Link>
          </div>
        </header>
        <div className="grid"> 
          {this.state.optionsBoxVisible === true &&
            <div className="optionsBox">
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
              What position?
            </div>
          }
          <div className='map-box'> 
            <Map zoom = {12} visibleMarkers={true} position = {[52.229, 20.970]}/> 
          </div>
          <div className='data-box'>
            <Data />
           </div>
          {this.props.team.sendTeam === true && 
          <div className='cover'> 
            <div className='operation-box' > 
              <Operation /> 
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    team: state.team
  }
}

export default connect(mapStateToProps)(App)
