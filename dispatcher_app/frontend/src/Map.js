import React from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
// import ambulanceOnIcon from './images/ambulance-on.png'
import { OpenStreetMapProvider } from 'leaflet-geosearch';

class Map extends React.Component{
    state = {
        lat: '',
        long: '',
        teams: [],
        search: '',
        searchResults: [],
    }

    componentDidMount() {
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })
    }

    ambulance = L.icon({
        iconUrl: ambulanceIcon,
        iconSize: [35,35]
    })

    // ambulanceOn = L.icon({
    //     iconUrl: ambulanceOnIcon,
    //     iconSize: [35,35]
    // })

    async searchLocation(event){
        this.setState({
            search: event.target.value
        })
        const prov = new OpenStreetMapProvider()
        const results = await prov.search({ query: event.target.value })
        this.setState({
            searchResults: results
        })
        console.log(this.state.searchResults)
    }

    render(){
        return(
            <MapContainer className='mapid' center={[52.229, 20.970]} zoom={12} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <div className='search-box'> 
                    <form className='search-box-form'> 
                        <input name='searchLocation' type='text' className='search-input' minlength="4" value={this.state.search} onChange={(e) => this.searchLocation(e)} />
                        <label htmlFor='searchLocation' className='search-label'> Search Address </label>
                    </form>
                    {this.state.search.length > 4 && 
                    <div className='search-results'> 
                        {this.state.searchResults.map((result) => 
                            <button className='search-chosen'> {result.label} </button>
                        )}
                    </div>
                    }
                </div> */}
                {this.state.teams.map((team) =>
                <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
                    <Tooltip > {team.top_id} </Tooltip>
                </Marker>
                )}
                <Marker position={[this.props.location.lat, this.props.location.long]} icon = {this.ambulance}>
                    <Tooltip direction="top" opacity={0.75} permanent>
                       {this.props.location.id}
                    </Tooltip>
                </Marker>
                
                {/* {this.state.searchLon !== '' & this.state.searchLat !== '' &&
                    <Marker position={[this.state.searchLat, this.state.searchLon]}> 
                    </Marker>
                } */}
                    
                <ZoomControl position="topright" />
            </MapContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Map)