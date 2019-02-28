import React from 'react'
import Clock from 'react-live-clock';
import { Container } from 'reactstrap'
import './AppClock.css'

const AppClock = () => {
    return (
        <Container className="app-clock-div">
            <Clock format="HH:mm:ss" ticking={true} interval={1000} className="app-clock" />
            <Clock format={'MMMM Mo, YYYY || dddd'} className="app-date"/>
        </Container>
    )
}

export default AppClock
