import React from 'react';
import { connect } from 'react-redux'
import DMMU_ApprovalFORM from './DPMU'

const ProducerCollective = ({profile,...rest}) => {

    if(profile.role === 3)
        return <DMMU_ApprovalFORM {...rest}/>
    return ''
}

const mapStateToProps = ({profile}) => {
    return { profile }
}
 
export default connect(mapStateToProps,null)(ProducerCollective);