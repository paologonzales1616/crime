import React from 'react'
import { connect } from 'unistore/react'
import './AppTable.css'

const TableData = props => {
    return props.data.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.brgy}</td>
                <td>{data.value.toFixed(2)}%</td>
            </tr>
        )
    })
}


const AppTable = ({ resultCrime }) => {
    return (
        <table className="app-table" cellPadding={3}>
            <tbody>
                <TableData data={resultCrime} />
            </tbody>
        </table>
    )
}

export default connect('resultCrime')(AppTable)
