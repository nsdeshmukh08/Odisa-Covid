import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import Checkbox from 'component/inputs/Checkbox'
import { STAFF_ROLE_ID } from 'helpers/variables'
import { history } from 'helpers'

let redirectPaths = {
    producerGroup:"/application/producer-group",
    productiveCollective:"/application/producer-collective",
    symr:"/application/SYMR",
    individualEnterprise:"/application/individualEnterprise",
    enterpriseGroup:"/application/enterpriseGroup",
}

const backToApplication = () => {
    if(STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role'))){
        let localRoute = history.location.pathname.split("/")[2];
        let redirectURL = `/staff${redirectPaths[localRoute]}`
        history.replace(redirectURL)
    }else history.replace('/user/dashboard')
}

const ProgressTab = ({ tabs,match,stagesCompleted=[],history }) => {

    let stage = match.params?.stage
    return (
        <>
            <Container className="producer-tab-main">
                <Row className="mt-2">
                    <div className="producer-tab-head">
                        <ul className=" producer-tab-list mb-0">
                            {
                                tabs.map((data, key) => (
                                    <li key={key}>
                                        <Checkbox 
                                            id={'producerCollective-'+data.label}
                                            name="application-progess"
                                            className={`${parseInt(stage) !== data.activePathName && stagesCompleted.includes(data.activePathName) ? 'theme-black' : ''}`}
                                            checked={parseInt(stage) === data.activePathName  || stagesCompleted.includes(parseInt(data.activePathName))}
                                        >

                                        </Checkbox>
                                        <Link to={data.activePathName.toString()}>{data.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="back-to-app">
                            <Button className="bg-white border-none link" onClick={backToApplication}>
                                {
                                    `Back to ${STAFF_ROLE_ID.PUBLIC === parseInt(localStorage.getItem('role')) ? 'Application' : 'Application List'}`
                                }
                            </Button>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default ProgressTab