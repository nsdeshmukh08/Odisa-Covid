import React, { useEffect,useState } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import { history } from 'helpers'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Progress from 'assets/images/progress.svg'
import { PCFieldList,SYMRFieldList,PgAssessmentFieldList,EgAssessmentFieldList,IeFieldList } from 'helpers/assessmentScoreHandler'

const getTotalFields = (type) => {
    switch(type){
        case 'pc':
            return PCFieldList.length
        case 'pg':
            return PgAssessmentFieldList.length
        case 'symr':
            return SYMRFieldList.length
        case 'eg':
            return EgAssessmentFieldList.length
        case 'ie':
            return IeFieldList.length
    }
}
const AssessmentCard = ({assessmentList=[],formId,className,type='pc'}) => {

    const [assessment,setAssessment] = useState()

    useEffect(() => {
        if(assessmentList?.length > 0){
            let calculatedResult = assessmentList
                                .reduce(
                                    (initalvalue,data) => {
                                        initalvalue.assessmentScore += parseInt(data.assessmentScore ? data.assessmentScore : 0)
                                        initalvalue.assessmentTotalScore += parseInt(data.assessmentTotalScore ? data.assessmentTotalScore : 0)
                                        initalvalue.assessmentValue += parseInt(data.assessmentValue ? data.assessmentValue : 0)
                                        return initalvalue
                                    },
                                    {
                                        assessmentScore : 0,
                                        assessmentTotalScore : 0,
                                        assessmentValue : 0
                                    }
                                )
            calculatedResult.progress = parseInt(
                (calculatedResult.assessmentScore/calculatedResult.assessmentTotalScore) * 100
            )
            setAssessment(calculatedResult)
        }
    },[assessmentList])

    let totalFied = getTotalFields(type)

    return (
        <div className={"assesment-score"}>
            {/* <Row >
                <Col> <h2 className="mb-0 mt-3">Assessment</h2></Col>
            </Row> */}
            <Row>
                <Col className="m-3 ">
                    <Row className={`align-items-center score-progress ${className}`}>
                        {
                            assessment ? (
                            <div className="pr-3">
                                <CircularProgressbarWithChildren value={assessment.progress}>
                                    <div className="progress-img ">
                                        <img src={Progress}></img>
                                        <span class="custom-caret score mr-2"><i class="icon-tick"></i></span>
                                    </div>
                                </CircularProgressbarWithChildren>
                                
                            </div>) : (
                                <div className="assessment-card-header">
                                    <div className="icon-assessment">
                                        <i className="icon-list"></i>
                                    </div>
                                </div>
                            )
                            
                        }
                        <Col className="pl-0">
                            <h3 className="mb-0 text-white">First level Assessment</h3>
                            {
                                assessment 
                                    ? <h4 className="score">{assessment.assessmentScore} / {assessment.assessmentTotalScore}</h4> 
                                    : <small className="text-white">
                                        {`${totalFied} Not yet started`}
                                    </small>
                            }
                            
                            
                        </Col>
                        <Col className="d-flex justify-content-end">
                            
                            <Button onClick={() => history.push(`/add/firstlevelassessment`)}  outline color="primary" className="fw-500 btn btn-outline-primary btn-overlay-assesstment border-primary br-1 px-3 py-2 mb-0" >
                            {
                                assessment ? "View" : 'Start Assessment'
                            }
                            
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AssessmentCard;