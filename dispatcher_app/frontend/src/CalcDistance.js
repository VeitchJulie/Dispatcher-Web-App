import React from 'react'
import L from 'leaflet'
import {choseTeam} from './actions/team'
import {connect} from 'react-redux'

class CalcDistance extends React.Component{
    state = {
        result: this.props.result,
        teams: this.props.teams,
        showTeams: false,
        map: this.props.routingMap,
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
                team.distance = dist.toString()  
                this.setState({showTeams: true})
            })
            return team
        })
    }

    handleClick(team){
        this.props.dispatch(choseTeam({id: team.id}))
    }

    render(){
        return(
            this.state.showTeams === true && 
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Distance </th>
                        </tr>
                    </thead>
                    {this.state.teams.map((team) => {
                        return(
                            <tbody> 
                                <tr key = {team.id} onClick={() => this.handleClick(team)}> 
                                    <td> {team.id}  </td>
                                    <td> {team.distance} </td>
                                    {/* <td> <button> Send </button> </td> */}
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