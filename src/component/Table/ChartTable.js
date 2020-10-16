import React, { useContext } from 'react';
import { Table } from 'reactstrap';
import { ThemeContext } from 'helpers'

export const ChartTable = ({ data, emptyMessage, onClick, activeRow, isLoading }) => {

    const theme = useContext(ThemeContext);
    return (
        <div className="table-responsive">
            <Table striped className="custom-striped-table">
                <thead>
                    <tr>
                        <th>#</th>
                        {data.columns.map((data, key) => (
                            <th key={key}>
                                {
                                    data.multilingual ?
                                        theme[data.header]
                                        : data.header
                                }
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.rows.length && !isLoading ?
                        data.rows.map((row, i) => {
                            let isActive;
                            if (activeRow > -1) {
                                isActive = activeRow === i
                            }
                            return (
                                <tr key={i} className={`${isActive ? 'active' : ''}`}>
                                    <th>{i + 1}</th>
                                    {data.columns.map((column, j) => {
                                        console.log(column.Cell, "column.Cell")
                                        if (!column.Cell)
                                            return (
                                                <td key={j} >
                                                    <span onClick={() => !j && !column.disabled ? onClick(row, i) : ''}>
                                                        {row[column.accessor] ? row[column.accessor] : '-'}
                                                    </span>
                                                </td>
                                            )
                                        return <td key={j}>
                                            <span onClick={() => !j ? onClick(row, i) : ''}>
                                                {column.Cell(row)}
                                            </span>

                                        </td>
                                    })}
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td className="py-5 text-center empty" colSpan="100">
                                {isLoading ? "Loading..." : emptyMessage}
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
}

ChartTable.defaultProps = {
    emptyMessage: "No Records Found",
    onClick: () => { }
}