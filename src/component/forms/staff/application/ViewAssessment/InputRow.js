import React from 'react';
import { Row, Col,Table } from 'reactstrap';
import { IS_TRUE,IS_TRUE_Bool } from 'helpers/variables'
import FormInput from "component/inputs/FormInput";
import Uploadfile from 'component/inputs/Uploadfile'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { formatToINR } from 'helpers'

const validateField = (rowData) => {
    let isValid = (
        rowData.assessmentValue !== null  &&
        (
            (rowData.isSupportive && rowData.documents.length) ||
            (!rowData.isSupportive && rowData.reason)
        )
    )
    return isValid ? true : false
}

const InputRow = ({ data, index, onChange, onUpload, rowData, options, uploadingIndexes }) => {
    
    let { inputField,initialKeyName, scoreField,scoreCalc } = data

    let isAllRowValid = validateField(rowData)

    const getAssessmentField = () => {

        let input;
        console.log(inputField,rowData["assessmentValue"],rowData,"myDt123")
        switch(inputField.type){
            case 'isYesOrNo':
                input = <FormInput
                            {...inputField}
                            type='radio'
                            name={"assessmentValue"+index}
                            onChange={(name,value) => onChange('assessmentValue',value, data.scoreCalc)}
                            options={IS_TRUE_Bool}
                            value={rowData["assessmentValue"]}
                            // max={inputField.max}
                        />
            break;
            case 'SelectWithIsYesOrNo':
                input = <FormInput
                            {...inputField}
                            type='select'
                            name={"assessmentValue"+index}
                            onChange={(name,value) => onChange('assessmentValue',value, data.scoreCalc)}
                            options={IS_TRUE_Bool}
                            value={rowData["assessmentValue"]}
                            max={inputField.max}
                        />
            break;
            default:

                input = <FormInput
                            {...inputField}
                            type={inputField.type === 'number' || inputField.type === 'text' ? "percent" : inputField.type}
                            name={"assessmentValue"+index}
                            onChange={(name,value) => onChange('assessmentValue',value, data.scoreCalc)}
                            options={options[inputField.option]}
                            value={rowData["assessmentValue"]}
                            max={inputField.max}
                        />
            break;
        }
        return input
    }

    return (

        <Row className="border-top py-3 border-bottom position-relative ">
            <Col lg="4" className="list-out">
                {
                    isAllRowValid ?
                        <div className="assesment-icon">
                            <span class="custom-caret bg-primary text-white ml-2">
                                <i class="icon-tick"></i></span>
                        </div> :
                        <div className="assesment-icon">
                            <span class="custom-caret bg-danger text-white ml-2 small">
                                <i class="icon-close"></i></span>
                        </div>
                }

                <Col xl="10" className="ml-4">
                    <div id={`assessment-${index}`}>
                        {
                            getAssessmentField()
                        }
                    </div>
                    <UncontrolledPopover className="custom-popover" trigger="hover" placement={'left-top-bottom'} target={`assessment-${index}`}>
                        <PopoverHeader>Score Calculation</PopoverHeader>
                        <PopoverBody>
                            <Table bordered hover className="border-none w-100">
                                <thead>
                                    <tr>
                                        <th>Value</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        scoreCalc.type === 'range' ? 
                                        scoreCalc?.rangeValidation?.map(({range,score,value}) => 
                                            <tr>
                                                <td>
                                                {`${formatToINR(range.min)}${inputField.type === "percentageWithIcon"? "%":"" } ${range.max && range.min !== range.max -1 ? ` - ${formatToINR(range.max - 1)}${inputField.type === "percentageWithIcon"? "%":"" }` : ''}`}
                                                </td>
                                                <td>
                                                    {score}
                                                </td>
                                            </tr>
                                        ) : scoreCalc?.scoreType?.map((data) => {
                                            let option = inputField.type === 'SelectWithIsYesOrNo'|| inputField.type === 'isYesOrNo' 
                                                            ? IS_TRUE_Bool
                                                            :  options[inputField.option]

                                            return (
                                                <tr>
                                                    <td>
                                                        {`${option?.find(select => data.value == select.value)?.label} ${inputField.type === "percentageWithIcon"? "%":"" }`}
                                                    </td>
                                                    <td>
                                                        {data.score}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                            
                                        ) 
                                    }
                                </tbody>

                            </Table>

                        </PopoverBody>
                    </UncontrolledPopover>
                </Col>
            </Col>
            <Col lg="2">
                <Row>
                    <Col xl="5" className="pr-0">
                        <FormInput
                            type="percent"
                            name="assessmentScore"
                            onChange={(...params) => onChange(...params, null)}
                            label="Score"
                            value={rowData['assessmentScore']}
                            max={scoreField.max}
                            disabled={initialKeyName}
                        /></Col>
                    <Col xl="5" className="pl-0 mt-1 score-border">
                        <FormInput
                            type="text"
                            className="pointer-event-none"
                            value={`/ ${scoreField.maxText}`}
                        /></Col>
                </Row>
            </Col>
            <Col xl="6">
                <Row className="assesment-radio">
                    <Col lg="5">
                        <FormInput
                            type="radio"
                            label="Supportive Document"
                            name={`isSupportive-${index}`}
                            onChange={(name, value) => onChange("isSupportive", value, null)}
                            options={IS_TRUE}
                            value={rowData['isSupportive']}
                        />
                    </Col>
                    {
                        rowData['isSupportive'] ?
                            <Col lg="7" className="document-choose">
                                <a className="mb-2 d-flex"> Choose Document</a>
                                <Uploadfile
                                    name="documents"
                                    uploadedFileName={rowData.documents.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes(`documents-${index}`)}
                                    id={`isSupportive-${index}`}
                                    onChange={(...params) => onUpload(...params)}
                                />
                            </Col> :
                            <Col lg="7">
                                <FormInput
                                    type="textarea"
                                    label="Reason"
                                    name={`reason`}
                                    onChange={(...params) => onChange(...params, null)}
                                    value={rowData['reason']}
                                />
                            </Col>
                    }

                </Row>
            </Col>
        </Row>
    );
}

export default InputRow;