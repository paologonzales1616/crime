import React from 'react'
import { connect } from 'unistore/react'
import { Polygon, GoogleMap } from "react-google-maps"
import { calauan, bangyas, dayap, hanggan, mabacan, limao, masiit, paliparan, perez, kanluran, silangan, san_isidro, santo_tomas, imok, prinza, lamot_1, lamot_2, balayhangin } from '../../variables/coords'

const options = {
    fillColor: "#ffffff",
    fillOpacity: 0.4,
    strokeColor: "#ff0000",
    strokeOpacity: 1,
    strokeWeight: 2
}

const MapPolygon = props => {
    if (props.data === -1) {
        return <Polygon path={calauan} options={options} />
    }
    if (props.data === 18) {
        return <Polygon path={santo_tomas} options={options} />
    }
    if (props.data === 2) {
        return <Polygon path={bangyas} options={options} />
    }
    if (props.data === 5) {
        return <Polygon path={hanggan} options={options} />
    }
    if (props.data === 3) {
        return <Polygon path={dayap} options={options} />
    }
    if (props.data === 19) {
        return <Polygon path={silangan} options={options} />
    }
    if (props.data === 0) {
        return <Polygon path={balayhangin} options={options} />
    }
    if (props.data === 10) {
        return <Polygon path={limao} options={options} />
    }
    if (props.data === 13) {
        return <Polygon path={masiit} options={options} />
    }
    if (props.data === 8) {
        return <Polygon path={lamot_1} options={options} />
    }
    if (props.data === 11) {
        return <Polygon path={mabacan} options={options} />
    }
    if (props.data === 7) {
        return <Polygon path={kanluran} options={options} />
    }
    if (props.data === 6) {
        return <Polygon path={imok} options={options} />
    }
    if (props.data === 17) {
        return <Polygon path={san_isidro} options={options} />
    }
    if (props.data === 9) {
        return <Polygon path={lamot_2} options={options} />
    }
    if (props.data === 15) {
        return <Polygon path={perez} options={options} />
    }
    if (props.data === 16) {
        return <Polygon path={prinza} options={options} />
    }
    if (props.data === 14) {
        return <Polygon path={paliparan} options={options} />
    }
    if (props.data === 1) {
        return <Polygon path={bangyas} options={options} />
    }
    if (props.data === 12) {
        return <Polygon path={mabacan} options={options} />
    }
    if (props.data === 4) {
        return <Polygon path={hanggan} options={options} />
    }
}

const Map = ({ lat, lng, location, zoom }) => {
    return (
        <GoogleMap
            center={{ lat: lat, lng: lng }}
            zoom={zoom}
            defaultZoom={zoom}
            defaultCenter={{ lat: lat, lng: lng }}
            options={{

                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                panControl: false,
                fullscreenControl: false,
            }}
        >
            <MapPolygon data={location} />
        </GoogleMap>
    )
}

export default connect(['lng', 'lat', 'location', 'zoom'])(Map)
