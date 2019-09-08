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
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_r3ZpnvqK4Eb5ws9fsAFs0JGfReRU664"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />)
}

export default AppMap
