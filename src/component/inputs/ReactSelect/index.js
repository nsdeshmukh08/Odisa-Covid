import React from 'react';
import ReactSelectInput from 'react-select'
import { FormGroup, Label } from 'reactstrap'

const ReactSelect = (props) => {
    return (
        <FormGroup>
            <Label>
                {props.label}
            </Label>
            <ReactSelectInput
                onChange={(val) => props.onChange(props.name, val)}
                options={props.options}
                value={props.value}
                styles={props.styles}
                classNamePrefix='form-group'
                isMulti={props.isMulti}
                isClearable={props.isClearable}
                placeholder={props.placeholder}
            />
            <strong className="text-danger small">
                {props.error ? props.error[0] : ''}
            </strong>
        </FormGroup>

    );
}

ReactSelect.defaultProps = {
    onChange: () => { },
    options:[],
    value:'',
    classNamePrefix:'form-group',
    isMulti:false
}
export default ReactSelect;