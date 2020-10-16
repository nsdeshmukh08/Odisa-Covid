import React,{ useState } from 'react'
import { Row, Col, Collapse } from 'reactstrap';

const ArrowCollapse = ({children,name}) => {

    const [showDetails,toggleDetails] = useState(false)

    return ( 
        <div className="mt-3 bg-white application-detail">
            <Row id="application-detail" className="border-bottom p-4" >
                <Col>
                    <h3 className="fw-700 m-0">{name}</h3></Col>
                <Col>
                    <div className="d-flex justify-content-end">
                        <span className="circle-down cursor-pointer" onClick={() => toggleDetails(!showDetails)}>
                            <i className={`fa fa-chevron-down rotate ${showDetails ? 'active':''}`}></i>
                        </span>
                
                    </div>
                </Col>
            </Row>
            <Collapse isOpen={showDetails}>
                {children}
            </Collapse>
        </div>
     );
}
 
export default ArrowCollapse;