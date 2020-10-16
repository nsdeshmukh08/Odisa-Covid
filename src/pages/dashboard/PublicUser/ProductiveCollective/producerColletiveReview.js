import React,{ useEffect } from 'react';
import { ReviewSubmit } from 'component/forms/applications/ProductiveCollective'
import CreateApplicationHOC from 'HOC/CreateApplication'

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
    return ( 
        <>
            <ReviewSubmit { ...props }/>
        </>
     );
}

const ProductiveCollectiveReview = CreateApplicationHOC(ProductiveCollectiveReviewFunc)

export { ProductiveCollectiveReview }