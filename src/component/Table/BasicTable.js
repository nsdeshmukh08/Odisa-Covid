import React, { useContext } from 'react';
import { Table } from 'reactstrap';
import { ThemeContext } from 'helpers'

export const BasicTable = ({ data, emptyMessage,className,onClick,activeRow,isLoading }) => {

    const theme = useContext(ThemeContext);
    return (
        <div className="table-responsive">
            <Table borderless className={`${className} table-theme`}>
                <thead>
                    <tr>
                        {
                            data.columns.map((data, key) => (
                                <th key={key}>
                                    {
                                        data.multilingual ?
                                            theme[data.header]
                                        : data.header
                                    }
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.rows.length && !isLoading ?
                            data.rows.map((row, i) => {
                                let isActive;
                                if(activeRow > -1){
                                    isActive = activeRow === i
                                }
                                return (
                                    <tr key={i} className={`${isActive ? 'active' : ''}`}>
                                        {
                                            data.columns.map((column, i) => {
                                                if (!column.Cell)
                                                    return (
                                                        <td key={i} onClick={() => onClick(row)}>
                                                            {
                                                                row[column.accessor] ? row[column.accessor] : '-'
                                                            }
                                                        </td>
                                                    )
                                                return <td key={i} onClick={() => onClick(row)}>
                                                    {column.Cell(row)}
                                                </td>
                                            })
                                        }

                                    </tr>
                                )
                            })
                            : <tr>
                                <td className="py-5 text-center empty" colSpan="100">
                                    {
                                        isLoading 
                                            ? "Loading..."
                                            : emptyMessage
                                    
                                    }
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
}

BasicTable.defaultProps = {
    emptyMessage: "No Records Found",
    onClick : () => {}
}