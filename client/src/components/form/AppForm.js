import React from 'react'
import { connect } from 'unistore/react'
import { Button } from 'reactstrap'
import './AppForm.css'
import { actions } from '../../stores-and-actions'

const TimeComponent = () => {
    let temp = []
    for (let index = 0; index <= 24; index++) {
        temp.push(index)
    }
    return temp.map(data => <option key={data} value={`${data}`}>{data}</option>);
}

const MonthComponent = () => {
    let temp = []
    for (let index = 1; index <= 12; index++) {
        temp.push(index)
    }
    return temp.map(data => <option key={data} value={`${data}`}>{data}</option>);
}

const StartDayComponent = () => {
    let temp = []
    for (let index = 1; index <= 31; index++) {
        temp.push(index)
    }
    return temp.map(data => <option key={data} value={`${data}`}>{data}</option>);
}

const EndDayComponent = props => {
    let temp = []
    for (let index = props.data; index <= 31; index++) {
        temp.push(index)
    }
    return temp.map(data => <option key={data} value={`${data}`}>{data}</option>);
}

const CrimeComponent = props => {
    return props.data.map((data, index) => <option key={index} value={`${data.id}`}>{data.crime}</option>)
}

const LocationComponent = props => {
    return props.data.map((data, index) => <option key={index} value={`${data.id}`}>{data.location}</option>)
}

const AppForm = ({ url, startDay, locations, crimes, classify, changeMonth, changeStartDay, changeHour, changeEndDay, changeLoc, changeCrime, logout, locationDropdown, crimeDropdown, changeAppAddform, addForm }) => {
    return (
        <div className="app-form text-center">
            <label className="app-form-label">Month</label><br />
            <select size="sm" className="app-form-select-month" onChange={changeMonth}>
                <MonthComponent />
            </select>
            <label className="app-form-label">Start Day</label><br />
            <select size="sm" className="app-form-select-month" onChange={changeStartDay}>
                <StartDayComponent />
            </select>
            <label className="app-form-label">End Day</label><br />
            <select size="sm" className="app-form-select-month" onChange={changeEndDay}>
                <option value={-1}>None</option>
                <EndDayComponent data={startDay} />
            </select>
            <label className="app-form-label">Hour</label><br />
            <select size="sm" className="app-form-select-month" onChange={changeHour}>
                <TimeComponent />
            </select>
            <label className="app-form-label">Location</label><br />
            <select size="sm" className="app-form-select-month" disabled={locationDropdown} defaultValue={-1} onChange={changeLoc}>
                <option value={-1}>None</option>
                <LocationComponent data={locations} />
            </select>
            <label className="app-form-label">Crime</label><br />
            <select size="sm" className="app-form-select-month" disabled={crimeDropdown} defaultValue={-1} onChange={changeCrime}>
                <option value={-1}>None</option>
                <CrimeComponent data={crimes} />
            </select>
            <Button block color="warning" size="sm" onClick={classify} className="mt-2">SEARCH</Button>
            <Button block color="info" size="sm" value={true} onClick={changeAppAddform} className="mt-2">{addForm ? 'HIDE' : 'ADD'}</Button>
            <a target="_blank" href={`${url}dataset`} className="mt-2 btn btn-secondary btn-sm btn-block" >PRINT</a>
            <Button block color="danger" size="sm" onClick={logout} className="mt-2">LOGOUT</Button>
        </div>
    )
}

export default connect(['url','startDay', 'locations', 'crimes', 'locationDropdown', 'crimeDropdown', 'addForm'], actions)(AppForm)
