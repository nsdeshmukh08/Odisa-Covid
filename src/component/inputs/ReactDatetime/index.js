import React from 'react';
import DatePicker from 'react-datetime'
import moment from 'moment'
import { FormGroup, Label } from 'reactstrap'
import config from 'config'
import { calcAgeInYear } from 'helpers/momentHelpers'

const checkFromDate = (currentDate) => {
    return moment(currentDate, config.DEFAULT_DATE_FORMAT)
        .isBefore(
            moment().subtract(1, 'days'),
            config.DEFAULT_DATE_FORMAT
        )
}

const ReactDateTime = (props) => {
    return (
        <FormGroup className="data-pick w-100">
            <Label>
                {props.label}
                {
                    props.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                } 
            </Label>
            <div className="d-flex align-items-center">
                <DatePicker
                    className={`custom-date-group ${props.className}`}
                    onChange={(val) => props.onChange(props.name, val)}
                    // dateFormat={props.dateFormat}
                    closeOnSelect={props.closeOnSelect}
                    isValidDate={props.isValidDate}
                    // timeFormat={props.timeFormat}
                    inputProps={{
                        placeholder: props.placeholder,
                        readOnly : true
                    }}
                    value={props.value ? moment(props.value).format(config.DEFAULT_DATE_FORMAT) : ''}
                />
                {
                    props.showAge 
                        ? <label htmlFor="" className="ml-4 text-black fw-700">
                            {calcAgeInYear(props.value)}
                        </label>
                        : '' 
                }
                
            </div>

            <strong className="text-danger small">
                {props.error ? props.error[0] : ''}
            </strong>
        </FormGroup>
    );
}

ReactDateTime.defaultProps = {
    onChange: () => { },
    dateFormat: config.DEFAULT_DATE_FORMAT,
    closeOnSelect: true,
    isValidDate: () => true,
    isValidDate: checkFromDate,
    viewDate: (date) => moment(date).format(config.DEFAULT_DATE_FORMAT),
    timeFormat: false,
    error: '',
    showAge : false,
    isOptional : false
}

export default ReactDateTime;