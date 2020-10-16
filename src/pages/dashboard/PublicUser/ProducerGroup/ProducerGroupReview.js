import React,{ useEffect } from 'react';
import { ReviewSubmit } from 'component/forms/applications/ProductGroup'
import CreateApplicationHOC from 'HOC/CreateApplication'

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
    return ( 
        <>
            <ReviewSubmit { ...props }/>
        </>
     );
}

const ProducerGroupReview = CreateApplicationHOC(ProductiveCollectiveReviewFunc)

export { ProducerGroupReview }