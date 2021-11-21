import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './styles/CreateCase.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-routing-machine'
import L from 'leaflet'
import CalcDistance from './CalcDistance'

class CreateCase extends React.Component{

    state = {
        search: "",
        searchResults: [],
        searchedLocation: undefined,
        display: "block",
        teams:  [],
        distances: [],
        showTeams: false,
        result: "",
        map: undefined
        // routeControl: undefined,
    }

    componentDidMount(){
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({
                teams: response.data,
                map: L.map('route-map').setView([52.237049, 21.017532], 11) 
            })
        })
    }

    


    // calculateDistance(result){
    //     let map = L.map('route-map').setView([52.237049, 21.017532], 11);
    //     this.state.teams.map(function(team){
    //         const routeControl = L.Routing.control({
    //             waypoints: [
    //                 L.latLng(team.lat, team.long),
    //                 L.latLng(result.y, result.x)
    //             ],
    //             show: true,
    //         }).addTo(map)
    //         routeControl.on('routesfound', (e) => {
    //             let routes = e.routes;
    //             let dist = routes[0].summary.totalDistance;
    //             team.distance = dist.toString()  
    //             // this.setState({showTeams: true})              
    //         })
    //     return team
    //     })
    // }

    async searchLocation(event){

        this.setState({
            search: event.target.value,
            display: "block"
        })
        const prov = new OpenStreetMapProvider({
            params: {
                'accept-language': 'pl,en',
                countrycodes: 'pl'
            },
        })
        const results = await prov.search({ query: event.target.value })
        this.setState({
            searchResults: results
        })
        if(event.target.value === ''){
            this.setState({
                searchedLocation: undefined,
                result: ""
            })
        }
    }

    handleSearch(result){
        this.setState({
            result: result,
            display: "none",
            search: result.label,
            searchedLocation: [result.y, result.x]
        })
        // document.getElementsByClassName('result-label')[0].appendChild(
        //     <CalcDistance 
        //         result = {result}
        //         teams = {this.state.teams} />
        // )
        // await this.calculateDistance(result).then((res) => {
        //     this.setState({
        //         teams: res,
        //         display: "none",
        //         search: result.label,
        //         searchedLocation: [result.y, result.x],
        //     })
        // })
        // console.log(results)
        // this.setState({
        //     display: "none",
        //     search: result.label,
        //     searchedLocation: [result.y, result.x],
        //     // teams: results
        // })
        
        // , () => {
        //     // document.getElementsByClassName('result-label')[0].innerHTML = result.label
        //     const newTeams = this.calculateDistance(result)
        //     this.setState({teams: newTeams})
        // })
        // console.log(result.label)
        
    }


    render(){
        return(
            <div className="CreateCase">
                <header className="App-header">
                    <div>
                        <div className='App-name'> Dispatcher App </div>   
                    </div>
                    <div className="home">
                        <Link to="/"> Home </Link>
                    </div>
                </header>
                <div className = "container">
                    <div className="row">
                        <div className="col">
                            <input name='searchLocation' placeholder='enter address' type='search' className='input-location' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                            {this.state.search.length > 3 && 
                            <div className='results' style={{"display": this.state.display}}> 
                                {this.state.searchResults.map((result, key) => 
                                    <button key={key} className='chosen-address' onClick={() => this.handleSearch(result)}> {result.label} </button>
                                )}
                            </div>
                            }
                            <div id="map"> </div>
                            <div id="route-map"> </div> 
                        </div>
                        <div className="col">
                            <div className="result-label"> Team </div>
                            {this.state.result !== "" &&
                                <CalcDistance
                                    result = {this.state.result}
                                    teams = {this.state.teams} 
                                    map = {this.state.map} />
                            }
                                {/* {this.state.showTeams == true &&
                                    this.listTeams(this.state.teams) 
                                } */}
                                {/* {this.state.showTeams === true && 
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
                                                <tr key = {team.id}> 
                                                    <td> {team.id}  </td>
                                                    <td> {team.distance} </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                                } */}
                            </div>
                        <div className="col">
                            Send Form
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateCase