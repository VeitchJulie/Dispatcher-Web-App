import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
import iconRed from './images/icon-red.png'
import RoutingMachine from './Routing'

// import ambulanceOnIcon from './images/ambulance-on.png'


class Map extends React.Component{
    state = {
        teams: [],
        showMarkers: this.props.visibleMarkers,
        position: [52.229, 20.970],
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
    
    render(){
        let pos = ''
        this.props.location.id === '' ? pos = this.state.position : pos = [this.props.location.lat, this.props.location.long]
        return(
            <MapContainer className='mapid' center={pos} zoom={12} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.teamState.sendTeam === false && 
                    this.state.teams.map((team) =>
                        <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
                            <Tooltip > {team.top_id} </Tooltip>
                        </Marker>
                    )
                }
                {this.props.teamState.sendTeam === false && 
                    <Marker position={[this.props.location.lat, this.props.location.long]} icon = {this.ambulance}>
                        <Tooltip direction="top" opacity={0.75} permanent>
                            {this.props.location.id}
                        </Tooltip>
                    </Marker>
                }

                {this.props.teamState.sendTeam === true &&
                    <Marker position={[this.props.location.lat, this.props.location.long]}> </Marker>
                }
                {this.props.teamState.searchLat !== "" &&
                    <RoutingMachine />
                }
                <ZoomControl position="topright" />
            </MapContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        teamState: state.teamState
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Map)

// function Map(props) {

//     const [map, setMap] = useState(null)
//     const position = props.position
//     const zoom = props.zoom
//     const visibleMarkers = props.visibleMarkers
//     const [teams, setTeams] = useState( [] )

//     useEffect(() => {
//         const axiosTeams = async () => {
//             const response = await axios('http://localhost:8000/teams/?format=json')
//             setTeams(response.data)
//         }
//         axiosTeams()
//     }, [])

//     useEffect(() => {
//         if(map !== null){
//             if(props.teamState.sendTeam === true & visibleMarkers === false){
//                 map.panInside({lat: props.teamState.searchLat, lng: props.teamState.searchLong})
//             }
//         }
//     }, [props.teamState.searchLat, props.teamState.searchLong])
    
//     const ambulance = L.icon({
//         iconUrl: ambulanceIcon,
//         iconSize: [35,35]
//     })

//     const redIcon = L.icon({
//         iconUrl: iconRed,
//         iconSize: [35,45]
//     })

//     L.Icon.Default.prototype.options = {
//         iconUrl: '../node_modules/leaflet/dist/images/marker-icon.png'
//     }

//     return(
//         <MapContainer  className='mapid' whenCreated={setMap} center={position} zoom={zoom} scrollWheelZoom={true} zoomControl={false}>
//             <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {visibleMarkers === true && 
//                 teams.map((team) =>
//                     <Marker position={[team.lat, team.long]} key={team.id} icon = {ambulance}>
//                         <Tooltip > {team.top_id} </Tooltip>
//                     </Marker>
//                 )}
//             {visibleMarkers === true && 
//                 <Marker position={[props.location.lat, props.location.long]} icon = {ambulance}>
//                     <Tooltip direction="top" opacity={0.75} permanent>
//                         {props.location.id}
//                     </Tooltip>
//                 </Marker>
//             }
//             {visibleMarkers === false & props.teamState.sendTeam === true &&
//                 <Marker position={[props.location.lat, props.location.long]}> </Marker>
//             }
//             {visibleMarkers === false & props.teamState.sendTeam === true &&
//                 <Marker position={[props.teamState.searchLat, props.teamState.searchLong]}> </Marker>
//             }
//             {visibleMarkers === false & props.teamState.searchLat !== "" &&
//                 <RoutingMachine />
//             }
                
//                 <ZoomControl position="topright" />
//             </MapContainer>
//         )
//     }

// const mapStateToProps = (state) => {
//     return {
//         location: state.location,
//         teamState: state.teamState
//         // teams: state.teams
//     }
// }

// export default connect(mapStateToProps)(Map)