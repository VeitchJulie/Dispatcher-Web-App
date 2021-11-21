import './styles/App.css';
import Data from './Data'
import Map from './Map'
import Operation from './Operation'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
// import {downloadTeam} from './actions/teams'
// import axios from 'axios'
// import ambulanceIcon from './images/ambulance.png'
import React from 'react';

class App extends React.Component {

  // componentDidMount(){
  //   axios.get('http://localhost:8000/teams/?format=json').then((response) => {
  //     this.props.dispatch(downloadTeam({teams: response.data}))
  //   }) 
  // }
  

  // showTime = function(){
  //   let showDate = new Date()
  //   return <div className='right'> 
  //     {showDate.getDate() + '.' + (showDate.getMonth()+ 1 ) + '.' + showDate.getFullYear() + ' ' + showDate.getHours() + ':' + showDate.getMinutes()} 
  //   </div>
  // }

//     useEffect(() => {
//         const axiosTeams = async () => {
//             const response = await axios('http://localhost:8000/teams/?format=json')
//             setTeams(response.data)
//         }
//         axiosTeams()
//     }, [])
  
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
            {/* <img src={ambulanceIcon} alt='icon'/>  */}
            <div className='left'> Dispatcher App </div>   
          </div>
          <div className="past-cases">
            <Link to="/past"> Past Cases </Link> < br />  
            <Link to="CreateCase"> Create a new Case </Link>
          </div>
        </header>
        <div className="grid"> 
          <div className='map-box'> 
          {/* {
            this.props.teams[0] !== undefined && */}
            <Map 
            // allTeams = {this.props.teams[0]}
            zoom = {12}
            visibleMarkers={true}
            position = {[52.229, 20.970]}/> 
          {/* } */}
         
          </div>
          <div className='data-box'>
            {/* {
              this.props.teams[0] !== undefined && */}
              <Data 
                // allTeams = {this.props.teams[0]}
              />
            {/* } */}
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
    )}
}

const mapStateToProps = (state) => {
  return {
    // location: state.location,
    team: state.team,
    teams: state.teams
  }
}

export default connect(mapStateToProps)(App)
