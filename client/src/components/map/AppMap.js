import React from 'react'
import Map from './Map'
import { withScriptjs, withGoogleMap } from "react-google-maps";
import './AppMap.css'

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <Map />
  ))
);

const AppMap = () => {
  return (<MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBD5TONxgsx86_zK3A5uRhe8YL4USivhfA"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />)
}

export default AppMap
