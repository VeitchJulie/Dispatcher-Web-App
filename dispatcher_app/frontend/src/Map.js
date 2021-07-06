import React from 'react'
import { MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import './styles/Map.css'

class Map extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lat: '',
            long: '',
        }
    }

    render(){
        return(
            <MapContainer className='mapid' center={[52.229, 20.990]} zoom={12} scrollWheelZoom={false} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
            </MapContainer>
        )
    }
}

export default Map