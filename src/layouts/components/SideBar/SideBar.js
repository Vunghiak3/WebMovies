import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./SideBar.module.scss";
import * as movieServices from "~/services/movieServices";
import { MovieItemOnlyText, MovieItemSearch } from "~/components/MovieItem";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

export function BoxMovie({ title, children, btnMore = false, ...props }) {
  return (
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
    </div>
  );
}

function SideBar() {
  const [newMovies, setNewMovies] = useState([]);
  const [hotMovies, setHotMovies] = useState([]);
  const numberNewMovies = 7;
  const numberHotMovies = 5;

  useEffect(() => {
    const fetchApiNewUpdateMovies = async () => {
      const result = await movieServices.getLstMovieBySlug("phim-moi-cap-nhat");

      setNewMovies(result);
      setHotMovies(result);
    };

    fetchApiNewUpdateMovies();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <BoxMovie title={newMovies.titlePage} btnMore>
        {!Array.isArray(newMovies) ? (
          newMovies.items
            .slice(0, numberNewMovies)
            .map((movie) => (
              <MovieItemOnlyText
                className={cx("movie-item")}
                key={movie.item._id}
                movie={movie.item}
              />
            ))
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </BoxMovie>

      <BoxMovie title="Hot tuần" className="distance-movie-item">
        {!Array.isArray(hotMovies) ? (
          hotMovies.items
            .slice(0, numberHotMovies)
            .map((movie) => (
              <MovieItemSearch movie={movie} key={movie.item._id} hoverMovie />
            ))
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </BoxMovie>
    </div>
  );
}

export default SideBar;
