import React, { useEffect } from 'react';

import { IAReviewSubmit } from 'component/forms/applications/IndividualEnterprise';

import CreateApplicationHOC from 'HOC/CreateApplication';

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
  return (
    <>
      <IAReviewSubmit {...props} />
    </>
  );
};

const IndividualEnterpriseReview = CreateApplicationHOC(
  ProductiveCollectiveReviewFunc
);

export { IndividualEnterpriseReview };
