import React from "react";
import FormInput from 'component/inputs/FormInput'


let rowsPerPage = [
    {
        label : '30',
        value : 30
    },
    {
        label : '60',
        value : 60
    },
    {
        label : '90',
        value : 90
    },
    
    {
        label : '120',
        value : 120
    }
]

const ChartPagination = (props) => {
    return (
        <div className="d-flex justify-content-end align-items-center px-5 pb-3">
            <FormInput 
                type="select" 
                label="Rows Per Page" 
                className="mr-5 pr-5 mb-0 inline input-no-border"
                options={rowsPerPage}
                defaultSelect={false}
                value={props.pagination.limit}
                onChange={(name,value) => props.handlePageCount(value)}
            />
            <div className="d-flex align-items-center h1 mb-0">
                <span className="text-lighGrey-2 h6 m-0 mr-3">
                    {
                    props.pagination.page} - {props.pagination.total_pages} of {
                    props.pagination.limit
                    }
                </span>
                <i 
                    className={`fa fa-angle-left mr-5 ${props.pagination.page <= 1 ? 'text-lightGrey pointer-event-none': 'cursor-pointer'}`}
                    onClick={() => props.handlePageChange(props.pagination.page - 1)}
                ></i>
                <i 
                    className={`fa fa-angle-right  ${props.pagination.page === props.pagination.total_pages ? 'text-lightGrey pointer-event-none ': 'cursor-pointer'}`}
                    onClick={() => props.handlePageChange(props.pagination.page + 1)}
                ></i>
            </div>
        </div>
    );
};

export default ChartPagination;
