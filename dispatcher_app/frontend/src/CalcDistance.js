import React from 'react'
import L from 'leaflet'
import {choseTeam} from './actions/team'
import {connect} from 'react-redux'
import './styles/CalcDistance.css'

class CalcDistance extends React.Component{
    state = {
        result: this.props.result,
        teams: this.props.teams,
        showTeams: false,
        map: this.props.routingMap,
        clicked: [false,''],
    }

    
    componentDidMount(){
        this.state.teams.map((team) => {
            const routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(team.lat, team.long),
                    L.latLng(this.state.result.y, this.state.result.x)
                ],
                show: true,
            }).addTo(this.state.map)
            routeControl.on('routesfound', (e) => {
                let routes = e.routes;
                const dist = routes[0].summary.totalDistance;
                const time = routes[0].summary.totalTime;
                team.distance = (dist/1000).toFixed(2).toString()  
                team.time = this.convertHM(time)
                this.setState({showTeams: true})
            })
            return team
        })
    }

    handleClick(team, key){
        this.props.dispatch(choseTeam({id: team.id}))
        document.getElementsByClassName('questionare-teamId')[0].value = team.id
        if (this.state.clicked[0] === false & this.state.clicked[1] === '') {
            document.getElementsByClassName('tableRowTeams')[key].style.backgroundColor = "rgba(0, 0, 0, 0.075)";
            this.setState({clicked: [true, key]})
        } else if(this.state.clicked[0] === true & this.state.clicked[1] === key){
            document.getElementsByClassName('tableRowTeams')[key].style.backgroundColor = "transparent";
            this.setState({clicked: [false, '']})
        } else if(this.state.clicked[0] === true & this.state.clicked[1] !== key){
            document.getElementsByClassName('tableRowTeams')[this.state.clicked[1]].style.backgroundColor = "transparent";
            document.getElementsByClassName('tableRowTeams')[key].style.backgroundColor = "rgba(0, 0, 0, 0.075)";
            this.setState({clicked: [true, key]})
        } else{
            document.getElementsByClassName('tableRowTeams')[this.state.clicked[1]].style.backgroundColor = "transparent";
        }
        
    }

    convertHM(value) {
        const sec = parseInt(value, 10)
        let hours   = Math.floor(sec / 3600)
        let minutes = Math.floor((sec - (hours * 3600)) / 60)
        if (hours   < 10) {hours   = "0"+hours}
        if (minutes < 10) {minutes = "0"+minutes}
        return hours+':'+minutes 
    }

    render(){
        return(
            this.state.showTeams === true && 
                <table className="tableOfTeams">
                    <thead className="table-header">
                        <tr>
                            <th> State </th>
                            <th> Id </th>
                            <th> Distance [km] </th>
                            <th> Time [h] </th>
                        </tr>
                    </thead>
                    {this.state.teams.sort(function(a,b){
                        let keyA = a.time
                        let keyB = b.time
                        return ((keyA < keyB) ? -1 : ((keyA > keyB) ? 1 : 0));
                    }).map((team, key) => {
                        let colour = ''
                        team.state === 'Free' ? colour='#E3E7E8' : colour='#EB8E68'
                        return(
                            <tbody> 
                                <tr key = {team.id} className="tableRowTeams" onClick={() => this.handleClick(team, key)}> 
                                    <td> <div className='statusCreateCase' style={{"backgroundColor": colour}}>  </div>  </td>
                                    <td> {team.id}  </td>
                                    <td> {team.distance} </td>
                                    <td> {team.time} </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        team: state.team
    }
}

export default connect(mapStateToProps)(CalcDistance)