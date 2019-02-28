import React from 'react'
import Clock from 'react-live-clock'
import { Row } from 'reactstrap'
import './AppClock.css'

const AppClock = () => {
    return (
        <Row className="app-clock-div text-center">
            <Clock format="HH:mm:ss" ticking={true} interval={1000} className="app-clock" />
            <Clock format={'MMMM M, YYYY dddd'} className="app-date" />
        </Row>
    )
}

export default AppClock
