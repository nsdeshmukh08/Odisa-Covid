import React from "react"
import MapMarker from "assets/images/map-marker.svg"
import {
    Card,
    CardTitle,
    CardText
} from "reactstrap";
export const ReportsCard = ({ reportData, index, handleActiveIndex, activeIndex }) => {
    console.log('reportDatasata', reportData)
    return (
        <>
            {/* <div className="d-flex justify-content-between py-3 align-items-center">
            <h3 className="fw-600 m-0">All- 37</h3>
           </div> */}
            <Card body onClick={() => handleActiveIndex(index)} className={`p-2 reports-card mb-3 ${index === activeIndex ? "active" : ""}`}>
                <CardTitle className="d-flex align-items-center justify-content-between">
                    <h1 className="fw-600 m-0">{reportData?.report.length}</h1>
                    <img src={MapMarker} alt="MapMarker" className="reports-card-icon" />
                </CardTitle>
                <CardText className="reports-card-text">{reportData.name}</CardText>
            </Card>

        </>
    )
}