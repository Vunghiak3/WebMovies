import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./WrapperMovie.module.scss";
import { MovieItemMain } from "../MovieItem";
import Button from "~/components/Button";
import Pagination from "~/components/Pagination";

const cx = classNames.bind(styles);

export function WrapperMovieMain({
  movies,
  number,
  pagination = false,
  onChangePage,
  ...props
}) {
  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  return (
    <div className={cx("movie-container")} {...props}>
      {!Array.isArray(movies) ? (
        <>
          <h1 className={cx("title")}>{movies.titlePage}</h1>
          <ul className={cx("movielist")}>
            {movies.items.slice(0, number || 24).map((movie) => (
              <li key={movie.item._id}>
                <MovieItemMain movie={movie} />
              </li>
            ))}
          </ul>
          {(!pagination && (
            <Link
              to={"/:@" + movies.seoOnPage.og_url}
              className={cx("btn-more")}
            >
              Xem thêm...
            </Link>
          )) || (
            // <Pagination
            //   totalPages={totalPages}
            //   pageRanges={pageRanges}
            //   page={currentPage}
            //   startPage={startPage}
            //   endPage={endPage}
            //   onClick={handleChangePage}
            // />
            <div>paginations</div>
          )}
        </>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
}

export function WrapperMovieSideBar({
  title,
  children,
  btnMore = false,
  ...props
}) {
  <div className={cx("movie-container", props.className)}>
    <p className={cx("title-box")}>{title}</p>
    <div className={cx("lst-movie")}>
      {children}
      {btnMore && (
        <Button
          to="/danh-sach/phim-moi-cap-nhat?page=1"
          className={cx("movie-item", "btn-more")}
        >
          Xem thêm
        </Button>
      )}
    </div>
  </div>;
}
