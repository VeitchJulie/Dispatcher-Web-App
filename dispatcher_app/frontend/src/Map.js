import React from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
import ambulanceOnIcon from './images/ambulance-on.png'

class Map extends React.Component{
    state = {
        lat: '',
        long: '',
        teams: [],
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

    ambulanceOn = L.icon({
        iconUrl: ambulanceOnIcon,
        iconSize: [35,35]
    })

    render(){
        return(
            <MapContainer className='mapid' center={[52.229, 20.990]} zoom={12} scrollWheelZoom={false} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.teams.map((team) =>
                    <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
                    </Marker>
                )}
                    <Marker position={[this.props.location.lat, this.props.location.long]} icon = {this.ambulance}>
                    <Tooltip direction="top" opacity={0.75} permanent>
                       {this.props.location.id}
                    </Tooltip>
                    </Marker>
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