import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import VPRC_ApprovalFORM from './VPRC'
import { STAFF_ROLE_ID } from 'helpers/variables'

const SYMR = ({applicationDetail, profile,...rest}) => {

    if(profile.role !== STAFF_ROLE_ID.VPRC ) return ''
    return ( 
        <VPRC_ApprovalFORM 
            {...rest} 
            applicationDetail={applicationDetail}
        />
     );
}

const mapStateToProps = ({profile}) => {
    return { profile }
}
 
export default connect(mapStateToProps,null)(SYMR);