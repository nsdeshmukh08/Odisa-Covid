import React from 'react';
import { connect } from 'react-redux'
import BMMU_ApprovalFORM from './BPMU'
import DMMU_ApprovalFORM from './DPMU'

const EnterpriseApplication = ({profile,...rest}) => {
    let Component = profile.role === 4 ? BMMU_ApprovalFORM : DMMU_ApprovalFORM
    return ( 
        <Component {...rest}/>
     );
}

const mapStateToProps = ({profile,staff}) => {
    return { profile, ...staff.applications.selectedApplicationStatus }
}
 
export default connect(mapStateToProps,null)(EnterpriseApplication);