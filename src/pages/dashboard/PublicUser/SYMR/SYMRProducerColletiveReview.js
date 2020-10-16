import React,{ useEffect } from 'react';
import { SYMRReviewSubmit } from 'component/forms/applications/SYMR'
import CreateApplicationHOC from 'HOC/CreateApplication'

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
    return ( 
        <>
            <SYMRReviewSubmit { ...props }/>
        </>
     );
}

const SYMRProductiveCollectiveReview = CreateApplicationHOC(ProductiveCollectiveReviewFunc)

export { SYMRProductiveCollectiveReview }