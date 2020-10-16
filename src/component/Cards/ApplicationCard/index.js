import React from 'react';
import {
    Card,
    CardBody
} from 'reactstrap';

const ApplicationCard = (data) => {

    let { name,id } = data

    return (
        <Card className="application-card" onClick={()=> data.onClick(data.name)}>
            <CardBody className="application-card-body">
                <div className="application-card-wrapper">
                    <img className="img-fluid mr-3" src={data.image} />
                    <div className="content ml-3">
                        <h3 className="heading m-0">{data.name}</h3>
                        {/* <p className="para">{data.description}</p> */}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ApplicationCard;