import React from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
import RoutingMachine from './Routing'

class Map extends React.Component{
    state = {
        teams: [],
        showMarkers: this.props.visibleMarkers,
        position: this.props.position,
        team: '',
        searchedLocation: this.props.searchedLocation,
        zoom: this.props.zoom,
    }

    componentDidMount() {
        setInterval(() => {
            axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })}, 3000)  
    }

    showMarker(){
        if(this.props.team.id !== this.state.team.id){
            axios.get(`http://localhost:8000/teams/${this.props.team.id}/`).then((response) => {
                this.setState({team: response.data})
            })
        }
        if(this.state.team.id !== undefined){
            if(this.state.team.state === 'Free'){
                return(
                    <Marker position={[this.state.team.lat, this.state.team.long]} icon = {this.ambulance}>
                        <Tooltip direction="top" opacity={0.75} permanent>
                            {this.state.team.id}
                        </Tooltip>
                    </Marker>
            )}else if(this.state.team.state === 'Busy'){
                return(
                    <Marker position={[this.state.team.lat, this.state.team.long]} icon = {this.ambulance}>
                        <Tooltip direction="top" opacity={0.75} permanent>
                            {this.state.team.id}
                        </Tooltip>
                    </Marker>,
                    <RoutingMachine 
                        startLat = {this.state.team.lat}
                        startLng = {this.state.team.long}
                        endLat = {this.state.team.endLat}
                        endLng = {this.state.team.endLong}   
                    />
                )
            }
        }
    }

    setMarker(){
        if(this.props.team.id !== this.state.team.id){
            axios.get(`http://localhost:8000/teams/${this.props.team.id}/`).then((response) => {
                this.setState({team: response.data})
            })
        }
        if(this.state.team.id !== undefined){
            return(
                <Marker position={[this.state.team.lat, this.state.team.long]} icon = {this.ambulance}> </Marker>
            )
        }
    }

    setSearchMarker(){
        if(this.props.team.id !== this.state.team.id){
            axios.get(`http://localhost:8000/teams/${this.props.team.id}/`).then((response) => {
                this.setState({team: response.data})
            })
        }
        if(this.state.searchedLocation !== undefined){
            return(
                <Marker position={[this.state.searchedLocation[0], this.state.searchedLocation[1]]}> </Marker>
            )
        }
    }

    setRouting(){
        if(this.props.team.id !== this.state.team.id){
            axios.get(`http://localhost:8000/teams/${this.props.team.id}/`).then((response) => {
                this.setState({team: response.data})
            })
        }
        if(this.props.team.showRouting === true){
            if(this.state.searchedLocation !== undefined){
                return(
                    <RoutingMachine 
                        startLat = {this.state.team.lat}
                        startLng = {this.state.team.long}
                        endLat = {this.state.searchedLocation[0]}
                        endLng = {this.state.searchedLocation[1]}   
                    />
                )
            }
        }
    }

    ambulance = L.icon({
        iconUrl: ambulanceIcon,
        iconSize: [35,35]
    })
    
    render(){
        return(
            <MapContainer className='mapid' center={this.state.position} zoom={this.state.zoom} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.team.sendTeam === false && 
                    this.state.teams.map((team) =>
                        <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
                            <Tooltip > {team.id} </Tooltip>
                        </Marker>
                    )
                }
                {(this.props.team.id !== "" ) && 
                    this.showMarker()
                }
                {(this.props.team.sendTeam === true & this.state.searchedLocation !== undefined) &&
                    this.setSearchMarker()
                }
                {(this.props.team.sendTeam === true & this.props.team.showRouting === true) &&
                    this.setRouting()
                }
                <ZoomControl position="topright" />
            </MapContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        team: state.team,
    }
}

export default connect(mapStateToProps)(Map)
