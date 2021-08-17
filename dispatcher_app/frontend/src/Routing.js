import L from 'leaflet'
import {createControlComponent} from '@react-leaflet/core'
import 'leaflet-routing-machine'
import { connect } from 'react-redux'
// import iconRed from './images/icon-red.png'

const createRoutineMachineLayer = (props) => {
    let startLat = props.location.lat
    let startLng = props.location.long
    let endLat = ''
    let endLng = ''

    if(props.teamState.searchLat === ''){
        endLat = 52.300
        endLng = 21.050
    }else{
        endLat = props.teamState.searchLat
        endLng = props.teamState.searchLong
    }
    
    // const redIcon = L.icon({
    //     iconUrl: iconRed,
    //     iconSize: [35,50]
    // })

    const instance = L.Routing.control({
      waypoints: [
        L.latLng(startLat, startLng),
        L.latLng(endLat, endLng)
      ],
      routeWhileDragging: false,
    //   showAlternatives: true,
      show: true,
      autoRoute: true,
      collapsible: true,
    });
    
    return instance;
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer)

  const mapStateToProps = (state) => {
    return {
        location: state.location,
        teamState: state.teamState
    }
}

export default connect(mapStateToProps)(RoutingMachine)
