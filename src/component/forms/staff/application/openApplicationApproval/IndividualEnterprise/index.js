import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import IE_APPROVAL from './PLF'
import { STAFF_ROLE_ID } from 'helpers/variables'

const IndividualEnterprise = ({applicationDetail, profile,...rest}) => {

    if(profile.role !== STAFF_ROLE_ID.GPLF ) return ''
    return ( 
        <IE_APPROVAL 
            {...rest} 
            applicationDetail={applicationDetail}
        />
     );
}

const mapStateToProps = ({profile}) => {
    return { profile }
}
 
export default connect(mapStateToProps,null)(IndividualEnterprise);