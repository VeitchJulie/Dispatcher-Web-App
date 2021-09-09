import React from 'react';
import './styles/Operation.css'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'
import axios from 'axios'
import { cancelTeam, hideRouting, showRouting } from './actions/team';

// var openrouteservice = require("openrouteservice-js");


class Operation extends React.Component{
    
    state = {
        search: '',
        searchResults: [],
        display: "block",
        team: this.getTeam(this.props.team.id),
        searchedLocation: undefined,
    }

    handleClose(){
        this.props.dispatch(cancelTeam({id: ''}))
        // this.props.dispatch(hideRouting({id: this.state.team.id}))
    }

    handleSearch = (result) => {
        this.setState({
            display: "none",
            search: result.label,
            searchedLocation: [result.y, result.x]
        },() => {
            console.log(this.state.searchedLocation)
            this.props.dispatch(showRouting({id: this.state.team.id}))
        })
    }

    getTeam(id){
        axios.get(`http://localhost:8000/teams/${id}/`).then((response) => {
            this.setState({team: response.data})
        })
    }

    handleGo =  () => {
        const object = {
            "id": this.state.team.id,
            "top_id": this.state.team.top_id,
            "state": "Busy",
            "lat": this.state.team.lat,
            "long": this.state.team.long,
            "endLat": this.state.searchedLocation[0],
            "endLong": this.state.searchedLocation[1],
        }
        axios.put(`http://localhost:8000/teams/${object.id}/`, object).then(() => {
            this.setState({team: object})
        })
        window.location.reload()
    }
    
    async searchLocation(event){
        this.setState({display: "block"})
        this.setState({
            search: event.target.value
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
    }

    render(){
        return (
        <div className='main'> 
            <div className='header'> 
            {this.state.team !== undefined && 
                <div className='team-id'> {this.state.team.id} </div> 
                // <div className='team-status'> Status: {this.state.team.state} </div>
            }
            <div className='search-box'> 
                    <form className='search-box-form'> 
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                        <div className='inputs'> 
                            <input name='searchLocation' placeholder='enter address' type='text' className='search-input' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                            <button className='go-button' type='button' value='go' onClick={() => this.handleGo()}> </button>
                        </div>
                    </form>
                    {this.state.search.length > 3 && 
                    <div className='search-results' style={{"display": this.state.display}}> 
                        {this.state.searchResults.map((result, key) => 
                            <button key={key} className='search-chosen' onClick={() => this.handleSearch(result)}> {result.label} </button>
                        )}
                    </div>
                    }
                </div>
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </div>
            <div className='operation-body'> 
                <div className='map'>
                    <Map 
                    key = {this.state.searchedLocation}
                    visibleMarkers={false}
                    position = {[this.props.team.lat, this.props.team.long]}
                    zoom = {13}
                    searchedLocation = {this.state.searchedLocation}
                    />
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        team: state.team,
        teamState: state.teamState
    }
}
  
  export default connect(mapStateToProps)(Operation)
  