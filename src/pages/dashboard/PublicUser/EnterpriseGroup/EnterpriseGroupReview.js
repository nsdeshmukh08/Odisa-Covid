import React,{ useEffect } from 'react';
import { ReviewSubmit } from 'component/forms/applications/EnterpriseGroup'
import CreateApplicationHOC from 'HOC/CreateApplication'

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
    return ( 
        <>
            <ReviewSubmit { ...props }/>
        </>
     );
}

const EnterpriseGroupReview = CreateApplicationHOC(ProductiveCollectiveReviewFunc)

export { EnterpriseGroupReview }