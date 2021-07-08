import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "./styles/react-leaflet-geosearch.css";


const SearchControl = (props) => {
  const map = useMap()

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      style: 'bar',
      ...props
    })

    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
    })

  return null
}
export default SearchControl