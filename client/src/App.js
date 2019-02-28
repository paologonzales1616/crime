import React from 'react'
import { connect } from 'unistore/react'
import AppMap from './components/map/AppMap'
import AppClock from './components/clock/AppClock'
import AppTable from './components/table/AppTable'
import AppCrimeSummary from './components/crime summary/AppCrimeSummary'
import AppForm from './components/form/AppForm'
import AppLogin from './components/login/AppLogin'
import AppAddForm from './components/add_form/AppAddForm'
const App = ({ user, table, summaryGraph, addForm }) => {
  return (
    <>
      {user ? (<><AppForm />
        {table ? (<AppCrimeSummary />) : ('')}
        {summaryGraph ? (<AppTable />) : ('')}
        {addForm ? (<AppAddForm />) : ('')}
        <AppClock />
        <AppMap /></>) : (<AppLogin />)}
    </>
  )
}

export default connect(['user', 'table', 'summaryGraph', 'addForm'])(App)
