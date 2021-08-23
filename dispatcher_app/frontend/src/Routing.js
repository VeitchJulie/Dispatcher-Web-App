import L from 'leaflet'
import {createControlComponent} from '@react-leaflet/core'
import 'leaflet-routing-machine'
import { connect } from 'react-redux'
// import iconRed from './images/icon-red.png'

const createRoutineMachineLayer = (props) => {
    let startLat = props.startLat
    let startLng = props.startLng
    let endLat = props.endLat
    let endLng = props.endLng

    const show = props.showRoute

    // if(props.teamState.searchLat === ''){
    //     endLat = 52.300
    //     endLng = 21.050
    // }else{
    //     endLat = props.teamState.searchLat
    //     endLng = props.teamState.searchLong
    // }
    
    // const redIcon = L.icon({
    //     iconUrl: iconRed,
    //     iconSize: [35,50]
    // })

    const instance = L.Routing.control({
      position: 'topleft',
      waypoints: [
        L.latLng(startLat, startLng),
        L.latLng(endLat, endLng)
      ],
      // routeWhileDragging: true,
    //   showAlternatives: true,
      show: show,
      autoRoute: true,
      collapsible: true,
      addWaypoints: true,
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
