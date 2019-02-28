import React from 'react'
import './AppCrimeSummary.css'
import { Col, Row } from 'reactstrap'
import { connect } from 'unistore/react'
import { Pie } from 'react-chartjs-2'


const AppCrimeSummary = ({ result }) => {
  return (
    <div className="app-crime-summary">
      <h5 className="app-crime-summary-heading text-center">SUMMARY OF INCOMING CRIME</h5>
      <Row>
        <Col md="7">
          <div className="app-crime-summary-info">
            <p >{`${result[0].crime}`}     {`${result[0].value.toFixed(2)}%`}</p><br />
            <p >{`${result[1].crime}`}     {`${result[1].value.toFixed(2)}%`}</p><br />
            <p >{`${result[2].crime}`}     {`${result[2].value.toFixed(2)}%`}</p><br />
            <p >{`${result[3].crime}`}     {`${result[3].value.toFixed(2)}%`}</p><br />
            <p >{`${result[4].crime}`}     {`${result[4].value.toFixed(2)}%`}</p><br />
          </div>
        </Col>
        <Col md="5">
          <Pie data={{
            labels: [result[0].crime, result[1].crime, result[2].crime, result[3].crime, result[4].crime], datasets: [{
              backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#3b6dc6", "#ffc604"],
              data: [result[0].value.toFixed(2), result[1].value.toFixed(2), result[2].value.toFixed(2), result[3].value.toFixed(2), result[4].value.toFixed(2)],
            }]
          }} width={150} height={120} options={{
            legend:false
          }} />
        </Col>
      </Row>
    </div>
  )
}


export default connect('result')(AppCrimeSummary)