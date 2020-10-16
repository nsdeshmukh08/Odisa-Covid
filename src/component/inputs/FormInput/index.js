import React from 'react'
import { Col, FormGroup, Label, Input, CustomInput } from 'reactstrap';

let defaultMobileNumberPrefix = ["91", "81"]


const FormInput = ({ type, ...rest }) => {

    const handleNumberChange = event => {
        let { value } = event.target;
        value = value.replace(/[^0-9]/gi, '')
        let { min = 0, max } = rest
        if (rest.max && value)
            value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        return value
    };
    const handleDecimalinput = event => {
        let { value } = event.target
        let validInput = new RegExp(/^\d*\.?\d*$/).test(value)

        if (validInput) return value
    }
    const getInput = () => {
        switch (type) {
            case 'email':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                       { rest.label && <Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="text"
                                    name={rest.name}
                                    max={rest.max}
                                    disabled={rest.disabled}
                                    value={rest.value}
                                    onChange={(e) => rest.onChange(e.target.name, e.target.value)}
                                />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'percent':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                       { rest.label && <Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="number"
                                    name={rest.name}
                                    max={rest.max}
                                    disabled={rest.disabled}
                                    value={parseInt(rest.value) > -1 ? rest.value : ''}
                                    onChange={(e) => rest.onChange(e.target.name, handleNumberChange(e))}
                                />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'percentageWithIcon':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                     { rest.label &&   <Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="text"
                                    name={rest.name}
                                    max={100}
                                    disabled={rest.disabled}
                                    value={parseInt(rest.value) > -1 ? rest.value : ''}
                                    onChange={(e) => rest.onChange(e.target.name, handleNumberChange(e))}
                                ></Input>
                                <i class="fa fa-percent percentageWithIcon-icon" aria-hidden="true"></i>
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )

            case 'number':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                       { rest.label && <Label for="exampleEmail">
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="text"
                                    name={rest.name}
                                    maxLength={rest.max}
                                    disabled={rest.disabled}
                                    value={parseInt(rest.value) > -1 ? rest.value : ''}
                                    className={rest.inputClassName || '' }
                                    onChange={(e) => rest.onChange(e.target.name, e.target.value.replace(/[^0-9]/gi, ''))}
                                />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'decimal':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                        { rest.label &&<Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="text"
                                    name={rest.name}
                                    maxLength={rest.max}
                                    disabled={rest.disabled}
                                    value={rest.value && parseFloat(rest.value) > -1 ? rest.value : ''}
                                    onChange={(e) => rest.onChange(e.target.name, handleDecimalinput(e))}
                                />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'mobile':
                return (
                    <FormGroup className={`pb-3 ${rest.className}`}>
                        { rest.label &&<Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input
                                    type="text"
                                    name={rest.name}
                                    maxLength={"10"}
                                    disabled={rest.disabled}
                                    value={rest.value && !isNaN(rest.value) ? Number(rest.value) : ''}
                                    onChange={(e) => {
                                        rest.onChange(e.target.name, e.target.value)
                                    }}
                                />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'select':
                return (
                    <FormGroup className={rest.className}>
                       { rest.label && <Label for={rest.name}>
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <div>
                            <CustomInput
                                disabled={rest.disabled}
                                onChange={(e) => rest.onChange(e.target.name, e.target.value)}
                                type="select"
                                className="cursor-pointer"
                                value={rest.value}
                                name={rest.name}
                            >
                                {
                                    rest.defaultSelect ? <option value="">Select</option> : ''
                                }

                                {
                                    rest.options.map((data, i) => <option key={i} value={data.value}>{data.label}</option>)
                                }
                            </CustomInput>

                            <strong className="text-danger small">
                                {rest.error ? rest.error[0] : ''}
                            </strong>
                        </div>
                        {
                            rest.optionalRightLabel ?
                                <Label className="ml-2">
                                    {rest.optionalRightLabel}
                                </Label> : ''
                        }
                    </FormGroup>

                )
            case 'text':
                return (
                    <FormGroup className={`${rest.className}`}>
                        { rest.label &&<Label>
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <Col className="p-0">
                            <Input type="text" name={rest.name}
                                value={rest.value}
                                disabled={rest.disabled}
                                maxLength={rest.maxLength}
                                placeholder={rest.placeholder}
                                className={rest.inputClassName || '' }
                                onChange={(e) => rest.onChange(e.target.name, e.target.value)} />
                            {/* .replace(/[^a-zA-Z\s]/g, "") */}
                        </Col>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'no-special-character':
                return (
                    <FormGroup className="pb-3 mb-0">
                       { rest.label && <Label >
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <Col className="p-0">
                            <Input type="text" name={rest.name}
                                value={rest.value}
                                disabled={rest.disabled}
                                maxLength={rest.maxLength}
                                placeholder={rest.placeholder}
                                onChange={(e) => rest.onChange(e.target.name, e.target.value.replace(/[^a-z0-9]/gi, ''))} />
                            {/* .replace(/[^a-zA-Z\s]/g, "") */}
                        </Col>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'only-text':
                return (
                    <FormGroup className={`pb-3 mb-0 ${rest.className}`}>
                     { rest.label &&   <Label>
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <Col className="p-0">
                            <Input type="text" name={rest.name}
                                value={rest.value}
                                disabled={rest.disabled}
                                maxLength={rest.maxLength}
                                placeholder={rest.placeholder}
                                onChange={(e) => rest.onChange(e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ""))} />
                            {/* .replace(/[^a-zA-Z\s]/g, "") */}
                        </Col>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'no-special-character':
                return (
                    <FormGroup className="pb-3 mb-0">
                      { rest.label &&  <Label >
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <Col className="p-0">
                            <Input type="text" name={rest.name}
                                value={rest.value}
                                disabled={rest.disabled}
                                maxLength={rest.maxLength}
                                placeholder={rest.placeholder}
                                onChange={(e) => rest.onChange(e.target.name, e.target.value.replace(/[^a-z0-9]/gi, ''))} />
                            {/* .replace(/[^a-zA-Z\s]/g, "") */}
                        </Col>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'only-text':
                return (
                    <FormGroup className="pb-3 mb-0">
                       { rest.label && <Label >
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>}
                        <Col className="p-0">
                            <Input type="text" name={rest.name}
                                value={rest.value}
                                disabled={rest.disabled}
                                maxLength={rest.maxLength}
                                placeholder={rest.placeholder}
                                onChange={(e) => rest.onChange(e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ""))} />
                            {/* .replace(/[^a-zA-Z\s]/g, "") */}
                        </Col>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
            case 'textarea':
                return (
                    <FormGroup className="pb-3">
                       { rest.label && <Label for="exampleEmail">{rest.label}</Label>}
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <Input type="textarea" name={rest.name}
                                    value={rest.value}
                                    disabled={rest.disabled}
                                    readOnly={rest.readOnly}
                                    placeholder={rest.placeholder}
                                    maxLength={rest.maxLength}
                                    onChange={(e) => rest.onChange(e.target.name, e.target.value)} />
                            </Col>
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>

                )
            case 'file':
                return (
                    <FormGroup className="mb-3">
                        <div className="mobile-user d-flex w-100">
                            <Col className="p-0">
                                <div>
                                    <Input type="file" {...rest} />
                                </div>
                            </Col>
                        </div>
                    </FormGroup>

                )
            case 'radio':
                // console.log(rest.options, "options")
                return (
                    <FormGroup>
                        {rest.label ? <Label for="exampleEmail">{rest.label}</Label> : ''}

                        <div>
                            {
                                rest.options.map(data => (
                                    <label className={`custom-radio mr-3 ${data.disabled ? 'disabled' : ''}`}>
                                        <Label for={data.value} className="cursor-pointer">{data.label}</Label>
                                        <Input id={data.value} type="radio" name={rest.name}
                                            checked={data.value == rest.value}
                                            disabled={data.disabled}
                                            onChange={(e) => rest.onChange(rest.name, data.value)} />
                                        <span className="checkmark"></span>
                                    </label>
                                ))
                            }
                        </div>
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>

                    </FormGroup>

                )
            default:
                return (
                    <FormGroup >
                        <Label for={rest.name}>
                            {rest.label}
                            {
                                rest.isOptional ? <span className="text-yellow">&nbsp;( Optional )</span> : ''
                            }
                        </Label>
                        <Input
                            type={type}
                            name={rest.name}
                            value={rest.value}
                            disabled={rest.disabled}
                            maxLength={rest.maxLength}
                            onChange={(e) => rest.onChange(e.target.name, e.target.value)}
                        />
                        <strong className="text-danger small">
                            {rest.error ? rest.error[0] : ''}
                        </strong>
                    </FormGroup>
                )
        }
    }


    return (
        getInput()
    );
}

export default FormInput;

FormInput.defaultProps = {
    onChange: () => { },
    type: 'text',
    options: [],
    defaultSelect: true,
    isOptional: false
}
