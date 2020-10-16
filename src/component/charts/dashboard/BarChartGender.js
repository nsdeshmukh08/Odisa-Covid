import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Women from 'assets/images/women.png'
import { getPercentage,formatToINR } from 'helpers';

export class BarChartGender extends Component {

    render() {
        const {statistics } = this.props;

        return (
            <div className="gender-main">
                <div className="text-center my-4 ">
                    <h3 className="mb-1 fw-600" >{
                    formatToINR(statistics?.gender?.totalGender)}</h3>
                    <p>Total</p>
                </div>
                <Row className="px-5 text-center pb-4">
                    <Col>
                        <div className="women">
                            <h2>{statistics.gender && formatToINR(statistics.gender.totalFemale)}</h2>
                            <img src={Women} style={{height: statistics.gender? (Math.round(getPercentage(statistics.gender.totalFemale, statistics.gender.totalGender)) + 1) * 2: 45 }} alt={Women}></img>
                            <p className="mb-2 small mt-3">Women</p>
                            <h3 className="fw-600">{parseInt(getPercentage(statistics.gender && statistics.gender.totalFemale, statistics.gender && statistics.gender.totalGender))}%</h3>
                        </div>
                    </Col>
                    <Col className="men">
                        <div>
                            <h2>{statistics.gender && formatToINR(statistics.gender.totalMale)}</h2>
                            <img src={Women} style={{height: statistics.gender? (Math.round(getPercentage(statistics.gender.totalMale, statistics.gender.totalGender)) + 1 ) * 2 : 45 }} alt={Women}></img>
                            <p className="mb-2 small mt-3">Men</p>
                            <h3 className="fw-600">{parseInt(getPercentage(statistics.gender && statistics.gender.totalMale, statistics.gender && statistics.gender.totalGender))}%</h3>
                        </div>
                    </Col>
                    <Col className="transgender">
                        <div >
                            <h2>{statistics.gender && formatToINR(statistics.gender.totalTransgender)}</h2>
                            <img src={Women} style={{height: statistics.gender? (Math.round(getPercentage(statistics.gender.totalTransgender, statistics.gender.totalGender)) + 1) * 2 : 45 }}  alt={Women}></img>
                            <p className="mb-2 small mt-3">Transgender</p>
                            <h3 className="fw-600">{parseInt(getPercentage(statistics.gender && statistics.gender.totalTransgender, statistics.gender && statistics.gender.totalGender))}%</h3>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}
