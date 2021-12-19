import L from 'leaflet'
import {createControlComponent} from '@react-leaflet/core'
import 'leaflet-routing-machine'

const createRoutineMachineLayer = (props) => {

    let startLat = props.startLat
    let startLng = props.startLng
    let endLat = props.endLat
    let endLng = props.endLng

    const instance = L.Routing.control({
      position: 'topleft',
      waypoints: [
        L.latLng(startLat, startLng),
        L.latLng(endLat, endLng)
      ],
      routeWhileDragging: false,
      show: false,
      autoRoute: true,

    });
    return instance;
  };

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine
