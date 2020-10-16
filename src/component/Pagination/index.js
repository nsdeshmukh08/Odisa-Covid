import React from "react";
import Paginate from "react-paginate";

const Pagination = (props) => {
  return (
    <Paginate
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      activeClassName={"active"}
      page={props.page}
      initialPage={0}
      disableInitialCallback={ true }
      pageCount={props.pageCount}
      onPageChange={pagination => props.onPageChange(pagination.selected + 1)}
    />
  );
};

export default Pagination;
