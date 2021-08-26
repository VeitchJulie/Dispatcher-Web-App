import React from 'react';
import './styles/Operation.css'
import {connect} from 'react-redux'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Map from './Map'
import axios from 'axios'
import { cancelTeam } from './actions/team';
// var openrouteservice = require("openrouteservice-js");


class Operation extends React.Component{
    
    state = {
        search: '',
        searchResults: [],
        display: "block",
        sendLocation: [],
        team: this.getTeam(this.props.team.id),
    }

    // componentDidMount(){
    //     console.log(this.state.team)
    // }

    handleClose(){
        this.props.dispatch(cancelTeam({id: ''}))
    }

    handleSearch = (result) => {
        this.setState({
            sendLocation: [result.y, result.x],
            display: "none"
        })
    }

    getTeam(id){
        axios.get(`http://localhost:8000/teams/${id}/`).then((response) => {
            this.setState({team: response.data})
        })
    }

    handleGo = async () => {

        const object = {
            "id": this.state.team.id,
            "top_id": this.state.team.top_id,
            "state": "Busy",
            "lat": this.state.team.lat,
            "long": this.state.team.long,
            "endLat": this.state.sendLocation[0],
            "endLong": this.state.sendLocation[1],
        }

        await axios.put(`http://localhost:8000/teams/${this.state.team.id}/`, object)
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
            <header className='header'> 
            {this.state.team !== undefined && 
                <div className='team-id'> ID: {this.state.team.id} </div> 
                // <div className='team-status'> Status: {this.state.team.state} </div>
            }
                <button className='close-button' onClick={() => this.handleClose()}> X </button>
            </header>
            <div className='operation-body'> 
                <div className='search-box'> 
                    <form className='search-box-form'> 
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                        <div className='inputs'> 
                            <input name='searchLocation' placeholder='enter address' type='text' className='search-input' minLength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                            <input className='go-button' type='button' value='go' onClick={() => this.handleGo()}/>
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
                <div className='map'>
                    <Map 
                    visibleMarkers={false}
                    position = {[this.props.team.lat, this.props.team.long]}
                    zoom = {13}
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
  