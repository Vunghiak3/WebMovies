import classNames from "classnames/bind";

import styles from "./Pagination.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

function Pagination({
  totalPages,
  pageRanges,
  page,
  startPage,
  endPage,
  onClick,
}) {
  return (
    <div className={cx("wrapper")}>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <Button key={pageNumber} onClick={() => onClick(pageNumber)}>
            {pageNumber}
          </Button>
        );
      })}
    </div>
  );
}

export default Pagination;
