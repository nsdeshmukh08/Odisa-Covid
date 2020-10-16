import React from 'react';
import { connect } from 'react-redux'
import BMMU_ApprovalFORM from './BPMU'
import DMMU_ApprovalFORM from './DPMU'
import { STAFF_ROLE_ID } from 'helpers/variables'

const ProducerGroup = ({profile,...rest}) => {
    // console.log(rest,"in producer called $$$$$");
    let Component = profile.role === STAFF_ROLE_ID.BMMU 
        ? BMMU_ApprovalFORM 
        : DMMU_ApprovalFORM
    return ( 
        <Component {...rest}/>
     );
}

const mapStateToProps = ({profile,staff}) => {
    return { profile, ...staff.applications.selectedApplicationStatus}
}
 
export default connect(mapStateToProps,null)(ProducerGroup);
