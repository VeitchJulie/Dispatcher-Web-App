import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './styles/CreateCase.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-routing-machine'
import L from 'leaflet'
import CalcDistance from './CalcDistance'
import {connect} from 'react-redux'
import { cancelTeam, showRouting } from './actions/team';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'

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
        routingMap: undefined
        // routeControl: undefined,
    }

    componentDidMount(){
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({
                teams: response.data,
                routingMap: L.map('route-map').setView([52.237049, 21.017532], 11) 
            })
        })
    }


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
    }

    handleSendTeam = () => {
        let id = document.getElementsByClassName('questionare-teamId')[0].value
        let name = document.getElementsByClassName('questionare-callersName')[0].value
        let phone = document.getElementsByClassName('questionare-callersPhone')[0].value
        let extraInformation = document.getElementsByClassName('questionare-additionalInformation')[0].value

        const request = {
            "team" : id,
            "state": "TOACCEPT",
            "lat" : this.state.searchedLocation[0],
            "lng": this.state.searchedLocation[1],
            "name": name,
            "phone": phone,
            "extraInformation": extraInformation,
        }

        axios.post(`http://localhost:8000/cases/`, request)
        this.props.dispatch(showRouting({id: id}))
        this.handleClose()
    }

    handleClose(){
        this.props.dispatch(cancelTeam({id: ''}))
    }

    render(){
        return(
            <div className="CreateCase">
                <header className="App-header">
                    <div>
                        <div className='App-name'> Dispatcher App </div>   
                    </div>
                    <div className="home">
                    <Link to="/"> <button className="back-button"> </button> </Link>
                    </div>
                </header>
                <div className="row">
                    <div className="col">
                        <div className="mapContainer">
                            <div className="address-input">
                                <input name='searchLocation' placeholder='Enter Address...' type='search' className='input-location' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                                {this.state.search.length > 3 && 
                                <div className='results' style={{"display": this.state.display}}> 
                                    {this.state.searchResults.map((result, key) => 
                                        <button key={key} className='chosen-address' onClick={() => this.handleSearch(result)}> {result.label} </button>
                                    )}
                                </div>
                                }
                            </div>
                            <MapContainer className='mapid2' center={[52.229, 20.970]} zoom={13} scrollWheelZoom={true} zoomControl={false}> 
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                {this.state.searchedLocation !== undefined &&
                                    <Marker position={[this.state.searchedLocation[0], this.state.searchedLocation[1]]}> 
                                    </Marker>
                                }
                            </MapContainer>
                        </div>
                        <div id="route-map"> </div> 
                    </div>
                    <div className="col">
                        {/* <div className="result-label"> Team </div> */}
                        {this.state.result !== "" &&
                            <CalcDistance
                                result = {this.state.result}
                                teams = {this.state.teams} 
                                routingMap = {this.state.routingMap} />
                        }
                        </div>
                    <div className="col">
                        {/* { this.props.team.choseTeam === true &&  */}
                            {/* <p> {this.props.team.id } </p>, */}
                            <div className="questionare-inputs"> < br/>
                                <label className="labels"> Team ID </label> 
                                {/* <input type="text" defaultValue={this.props.team.id} className="questionare-teamId"/> <br /> <br /> */}
                                {/* <input type="select" list="teams" defaultValue={this.props.team.id} className="questionare-teamId"/> */}
                                <select className="questionare-teamId">
                                    <option value="" selected disabled hidden> Select Team </option>
                                    {this.state.teams.map((team) => {
                                        return(
                                            <option value={team.id}> {team.id} </option>
                                        )
                                    })}
                                </select>
                                <label className="labels"> Address </label> 
                                <input type="text" value={this.state.result.label} className="questionare-address" readOnly/>  <br /> <br />
                                <label className="radioLabel"> Caller Is Patient </label> 
                                <input type="checkbox" className="questionare-callerIsPatient"/>  <br /> <br />
                                <label className="labels"> Callers Name </label> 
                                <input type="text" className="questionare-callersName"/>  <br /> <br />
                                <label className="labels"> Callers Phone </label> 
                                <input type="tel" className="questionare-callersPhone"/>  <br /> <br />
                                <label className="labels"> Additional Information </label>
                                <textarea className="questionare-additionalInformation"> </textarea>
                                <br />
                                <br />
                                <input type='button' value='Send Request' className= "send-request-button" onClick={()=> this.handleSendTeam()}/>
                            </div>
                        {/* } */}
                    </div>
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

export default connect(mapStateToProps)(CreateCase)
