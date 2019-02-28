import React from 'react'
import './AppAddForm.css'
import { connect } from 'unistore/react'
import { actions } from '../../stores-and-actions'
import { Card, Button, Form, Row, Col, Label } from 'reactstrap'

const TimeComponent = () => {
  let temp = []
  for (let index = 0; index <= 24; index++) {
    temp.push(index)
  }
  return temp.map(data => <option key={data} value={data}>{data}</option>);
}

const MonthComponent = () => {
  let temp = []
  for (let index = 1; index <= 12; index++) {
    temp.push(index)
  }
  return temp.map(data => <option key={data} value={data}>{data}</option>);
}

const DayComponent = () => {
  let temp = []
  for (let index = 1; index <= 31; index++) {
    temp.push(index)
  }
  return temp.map(data => <option key={data} value={data}>{data}</option>);
}

const CrimeComponent = props => {
  return props.data.map((data, index) => <option key={index} value={data.id}>{data.crime}</option>)
}

const LocationComponent = props => {
  return props.data.map((data, index) => <option key={index} value={data.id}>{data.location}</option>)
}

const AppAddForm = ({ upload, changeUpdateMonth, changeUpdateDay, changeUpdateHour, changeUpdateLocation, changeUpdateCrime, locations, crimes }) => {
  return (
    <Card className="app-add-form-card">
      <h2 className="app-add-form-heading text-center">CRIME REPORTS</h2>
      <Form className="m-auto text-center" style={{ width: "100%" }} >
        <Row form>
          <Col md={1}></Col>
          <Col md={2}>
            <Label className="app-add-form-label">Month</Label>
            <select size="sm" className="app-form-select-month" onChange={changeUpdateMonth}>
              <MonthComponent />
            </select>
          </Col>
          <Col md={2}>
            <Label className="app-add-form-label">Day</Label>
            <select size="sm" className="app-form-select-month" onChange={changeUpdateDay}>
              <DayComponent />
            </select>
          </Col>
          <Col md={2}>
            <Label className="app-add-form-label">Hour</Label>
            <select size="sm" className="app-form-select-month" onChange={changeUpdateHour}>
              <TimeComponent />
            </select>
          </Col>
          <Col md={2}>
            <Label className="app-add-form-label">Location</Label>
            <select size="sm" className="app-form-select-month" onChange={changeUpdateLocation}>
              <LocationComponent data={locations} />
            </select>
          </Col>
          <Col md={2}>
            <Label className="app-add-form-label">Crime</Label>
            <select size="sm" className="app-form-select-month" onChange={changeUpdateCrime}>
              <CrimeComponent data={crimes} />
            </select>
          </Col>
          <Col md={1}></Col>
          <br />
          <Row className="text-center mt-4" style={{ width: "100%" }}>
            <Button color="warning m-auto" onClick={upload} size="">UPLOAD</Button>
          </Row>
        </Row>
      </Form>
    </Card>
  )
}

export default connect(['locations', 'crimes'], actions)(AppAddForm) 
