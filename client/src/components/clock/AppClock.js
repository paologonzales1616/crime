import React from 'react'
import Clock from 'react-live-clock'
import { Row } from 'reactstrap'
import './AppClock.css'
const date = Date.now()

const AppClock = () => {
    return (
        <Row className="app-clock-div text-center">
            <Clock format="HH:mm:ss" ticking={true} interval={1000} timezone={'Asia/Manila'} className="app-clock" />
            <Clock format={'MMMM Mo, YYYY dddd'} timezone={'Asia/Manila'} className="app-date" />
        </Row>
    )
}

export default AppClock
