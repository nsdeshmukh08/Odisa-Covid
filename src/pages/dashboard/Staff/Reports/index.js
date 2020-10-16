import React, { Component } from 'react'
import {ReportsTable} from "./ReportsTable"
import { ReportsCard } from "./ReportsCard"
import { API } from 'service';
import {
    Container,
    Col,
    Row
} from "reactstrap";
import TotalReports from 'helpers/reportsHandler'
import moment from 'moment'
import toast from "helpers/Toast";

export class Reports extends Component {

    state = {
        activeIndex: 0,
        reportData :[...TotalReports],
    }

    componentDidMount(){
        this.setState({
            selectedReport:this.state.reportData[0]
        })
    }

    handleActiveIndex = (i) => {
        this.setState({
            ...this.state,
            selectedReport:this.state.reportData[i],
            activeIndex:i
        })
    }

    downloadAsset = async (service,downloadType=1,{ additionalRequestPayload }) => {

        additionalRequestPayload['params']['downloadType'] = downloadType

        let requestPayload = {
            ...service,
            ...additionalRequestPayload
        }

        let response = await API(requestPayload)

        if(response.status === 200){
            let { data } = response.data
            window.open(data.url)
        }
        else{
            toast(response.data.message,'error')
        }
    }

    render() {
        let{reportData,selectedReport} = this.state
        let count =0;
        reportData&&reportData.map((item,index) => console.log('reproitem',count + item.report.length))
 
        return (
            <Container fluid className="mt-4 reports-main custom-scrollbar">
                <Row className="row align-items-center ">
                    <Col md="4">
                        <h1 className="text-darkGrey-2 fw-600">Reports</h1>
                        <p className="small">{moment().format("dddd, Do MMMM YYYY")}</p>
                    </Col>
                </Row>
                <Row className="reports-body row m-0">  
                            <Col md="2" className=" bg-white mb-3">
                                
                            <div className="d-flex justify-content-between py-3 align-items-center">
                              <h3 className="fw-600 m-0">
                              All- {count}</h3>
                             </div>
                            {reportData.map((item,index) => {
                               return <ReportsCard 
                                            index={index} 
                                            reportData={item} 
                                            activeIndex={this.state.activeIndex} 
                                            handleActiveIndex={this.handleActiveIndex}
                                    />
                            })}
                            </Col>
                            <Col md="10" className=" px-3">
                                <ReportsTable 
                                    reportData={reportData} 
                                    data={this.state.selectedReport} 
                                    downloadAsset={this.downloadAsset}
                                />
                            </Col>
                </Row>
            </Container>
        )
    }
}

// export { Reports }
