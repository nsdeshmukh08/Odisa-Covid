import React, { useEffect } from 'react';
import { SYMRReviewSubmit } from 'component/forms/applications/DiffabledVulnerable';
import CreateApplicationHOC from 'HOC/CreateApplication';

const ProductiveCollectiveReviewFunc = ({ ...props }) => {
  return (
    <>
      <SYMRReviewSubmit {...props} />
    </>
  );
};

const DiffabledVulnerableReview = CreateApplicationHOC(
  ProductiveCollectiveReviewFunc
);

export { DiffabledVulnerableReview };
