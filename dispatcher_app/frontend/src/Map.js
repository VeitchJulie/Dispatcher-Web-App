import React from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from 'react-leaflet'
import L from 'leaflet'
import './styles/Map.css'
import { connect } from 'react-redux'
import ambulanceIcon from './images/ambulance.png'
import RoutingMachine from './Routing'
// import iconRed from './images/icon-red.png'
// import ambulanceOnIcon from './images/ambulance-on.png'


class Map extends React.Component{
    state = {
        teams: [],
        showMarkers: this.props.visibleMarkers,
        position: [52.229, 20.970],
        team: '',
        searchedLocation: this.props.searchedLocation,
    }

    componentDidMount() {
        axios.get('http://localhost:8000/teams/?format=json').then((response) => {
            this.setState({teams: response.data})
        })
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
                            {this.state.team.top_id}
                        </Tooltip>
                    </Marker>
            )}else if(this.state.team.state === 'Busy'){
                return(
                    <Marker position={[this.state.team.lat, this.state.team.long]} icon = {this.ambulance}>
                        <Tooltip direction="top" opacity={0.75} permanent>
                            {this.state.team.top_id}
                        </Tooltip>
                    </Marker>,
                    <RoutingMachine 
                        startLat = {this.state.team.lat}
                        startLng = {this.state.team.long}
                        endLat = {this.state.team.endLat}
                        endLng = {this.state.team.endLong}   
                        show = {false}
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

    setRouting(){
        if(this.props.team.id !== this.state.team.id){
            axios.get(`http://localhost:8000/teams/${this.props.team.id}/`).then((response) => {
                this.setState({team: response.data})
            })
        }
        if(this.props.team.showRouting === true){
            console.log(this.state.searchedLocation)
            if(this.state.searchedLocation !== undefined){
                return(
                    <Marker position={[this.state.searchedLocation[0], this.state.searchedLocation[1]]}> </Marker>
                    // <RoutingMachine 
                    //     startLat = {this.state.team.lat}
                    //     startLng = {this.state.team.long}
                    //     endLat = {this.state.searchedLocation[0]}
                    //     endLng = {this.state.searchedLocation[1]}   
                    //     show = {true}
                    // />
                )
            }
        }
    }

    ambulance = L.icon({
        iconUrl: ambulanceIcon,
        iconSize: [35,35]
    })
    
    render(){
        // let pos = ''
        // this.props.team.id === '' ? pos = this.state.position : pos = [this.props.location.lat, this.props.location.long]
        return(
            <MapContainer className='mapid' center={this.state.position} zoom={11} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.team.sendTeam === false && 
                    this.state.teams.map((team) =>
                        <Marker position={[team.lat, team.long]} key={team.id} icon = {this.ambulance}>
                            <Tooltip > {team.top_id} </Tooltip>
                        </Marker>
                    )
                }
                {/* jeśli chce wyświetlać w zakładce 'send' ambulans, to usunąć trzeba 'this.props.team.sendTeam === false' */}
                {(this.props.team.id !== "" & this.props.team.sendTeam === false) && 
                    this.showMarker()
                }
                {/* {(this.props.team.id !== "" & this.props.team.sendTeam === true) &&
                    this.getMarker()
                } */}
                {this.props.team.sendTeam === true &&
                    this.setMarker()
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
        // teamState: state.teamState
        // teams: state.teams
    }
}

export default connect(mapStateToProps)(Map)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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