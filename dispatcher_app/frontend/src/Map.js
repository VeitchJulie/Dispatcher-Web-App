import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
// import ambulanceOnIcon from './images/ambulance-on.png'


// class Map extends React.Component{
//     state = {
//         teams: [],
//         showMarkers: this.props.showMarkers,
//         position: [52.229, 20.970],
//     }

//     componentDidMount() {
//         axios.get('http://localhost:8000/teams/?format=json').then((response) => {
//             this.setState({teams: response.data})
//         })
//     }

//     ambulance = L.icon({
//         iconUrl: ambulanceIcon,
//         iconSize: [35,35]
//     })

//     // ambulanceOn = L.icon({
//     //     iconUrl: ambulanceOnIcon,
//     //     iconSize: [35,35]
//     // })


//     // LocationMarker(){
//     //     const map = useMapEvents({
//     //         click() {
//     //             map.locate()
//     //         },
//     //         locationfound(e) {
//     //             this.setState({position: e.latlng})
//     //             map.flyTo(e.latlng, map.getZoom())
//     //         },
//     //     })

//     //     return this.state.position === null ? null: (
//     //         <Marker position={this.state.position}> 
//     //             <Popup> You are here </Popup>
//     //         </Marker>
//     //     )
//     // }
    
//     render(){
//         let pos = ''
//         this.props.location.id === '' ? pos = this.state.position : pos = [this.props.location.lat, this.props.location.long]
//         return(
//             <MapContainer className='mapid' center={pos} zoom={12} scrollWheelZoom={true} zoomControl={false}>
//                 <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 {this.props.teamState.sendTeam === false && 
//                     this.state.teams.map((team) =>
//                         <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
//                             <Tooltip > {team.top_id} </Tooltip>
//                         </Marker>
//                     )
//                 }
//                 {this.props.teamState.sendTeam === false && 
//                     <Marker position={[this.props.location.lat, this.props.location.long]} icon = {this.ambulance}
//                     eventHandlers={{
//                         click: () => {
//                             console.log('marker clicked')
//                         }
//                     }}
//                     >
//                         <Tooltip direction="top" opacity={0.75} permanent>
//                             {this.props.location.id}
//                         </Tooltip>
//                     </Marker>
//                 }

//                 {this.props.teamState.sendTeam === true &&
//                     <Marker position={[this.props.location.lat, this.props.location.long]} icon = {this.ambulance} 
//                     eventHandlers={{
//                         click: () => {
//                             console.log('marker clicked')
//                         }
//                     }}
//                     > </Marker>
//                 }
//                 {/* <this.LocationMarker /> */}
//                 <ZoomControl position="topright" />
//             </MapContainer>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         location: state.location,
//         teamState: state.teamState
//         // teams: state.teams
//     }
// }

// export default connect(mapStateToProps)(Map)

function Map(props) {

    const [map, setMap] = useState(null)
    const position = props.position
    const zoom = props.zoom
    const visibleMarkers = props.visibleMarkers
    const [teams, setTeams] = useState( [] )

    useEffect(() => {
        const axiosTeams = async () => {
            const response = await axios('http://localhost:8000/teams/?format=json')
            setTeams(response.data)
        }
        axiosTeams()
    }, [])

    useEffect(() => {
        if(map !== null){
            if(props.teamState.sendTeam === true & visibleMarkers === false){
                map.panInside({lat: props.location.lat, lng: props.location.long})
            }
        }
    }, [props.location.lat, props.location.long])
    
    const ambulance = L.icon({
        iconUrl: ambulanceIcon,
        iconSize: [35,35]
    })

    return(
        <MapContainer  className='mapid' whenCreated={setMap} center={position} zoom={zoom} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {visibleMarkers === true && 
                teams.map((team) =>
                    <Marker position={[team.lat, team.long]} key={team.id} icon = {ambulance}>
                        <Tooltip > {team.top_id} </Tooltip>
                    </Marker>
                )}
            {visibleMarkers === true && 
                <Marker position={[props.location.lat, props.location.long]} icon = {ambulance}>
                    <Tooltip direction="top" opacity={0.75} permanent>
                        {props.location.id}
                    </Tooltip>
                </Marker>
            }
            {visibleMarkers === false &&
                <Marker position={[props.location.lat, props.location.long]} icon = {ambulance} > </Marker>
            }
                <ZoomControl position="topright" />
            </MapContainer>
        )
    }

const mapStateToProps = (state) => {
    return {
        location: state.location,
        teamState: state.teamState
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Map)